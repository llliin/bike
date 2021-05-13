import helper from '../../utils/helper';
import userService from '../../services/user';
import { noSign } from '../../config';
import { checkUserDeposit, syncUserInfo } from '../../utils/utils';

const app = getApp();

Page({
  data: {
    isRiding: false,
    lat: 0,
    lng: 0,
  },
  async onLoad() {
    const user = await userService.login();
    app.globalData.userInfo = user;
    checkUserDeposit();
    this.checkOrder();
  },

  async onShow() {
    if (app.globalData.userInfo._id) {
      app.globalData.userInfo = await syncUserInfo();
      this.checkOrder();
    }
  },

  toRiding() {
    wx.navigateTo({
      url:
        '/pages/bike-riding/bike-riding?orderId=' +
        app.globalData.userInfo.ridingOrderId,
    });
  },

  /**
   * 检查订单
   */
  async checkOrder() {
    if (app.globalData.userInfo.ridingOrderId) {
      const c = await helper.$confirm({
        content: '您还有一个未完成的骑行订单是否查看？',
        confirmText: '前往页面',
      });
      if (c) this.toRiding();
      this.setData({ isRiding: true });
      return true;
    }
    this.setData({ isRiding: false });
    return false;
  },

  /**
   * 绑定用户的位置
   * @param ev {{detail:GeoModel}}
   */
  bindUserGeo(ev) {
    this.data.lat = ev.detail.lat;
    this.data.lng = ev.detail.lng;
  },

  /**
   * 扫描二维码
   */
  async scan() {
    if (
      !(await this.checkOrder()) &&
      (await checkUserDeposit()) &&
      this.checkBalance()
    ) {
      helper.$load('等待扫描结果');
      wx.scanCode({
        onlyFromCamera: true,
        success: async res => {
          helper.$close();
          if (res.result.includes(noSign)) {
            const bikeNo = res.result.replace(noSign, '');
            wx.navigateTo({
              url: `/pages/opening/opening?no=${bikeNo}&lat=${this.data.lat}&lng=${this.data.lng}`,
            });
          } else {
            helper.$alert({ title: '提示', content: '请扫描ZZL单车二维码' });
          }
        },
        fail: () => {
          helper.$close();
        },
      });
    }
  },

  checkBalance() {
    if (app.globalData.userInfo.balance <=0) {
      helper.$confirm({ content: '您的余额不足，请先进行充值.' }).then(e => {
        if (e) wx.navigateTo({ url: '/pages/charge/charge' });
      });
      return false;
    }
    return true;
  },
});
