import userService from '../../services/user';

const app = getApp();

Page({
  data: { userTrip: 0 },

  onShow() {
    this.syncUserInfo();
  },

  onPullDownRefresh() {
    this.syncUserInfo();
  },

  /**
   * 同步用户信息
   * @return {Promise<void>}
   */
  async syncUserInfo() {
    app.globalData.userInfo = await userService.getCurrentUser();
    this.setData({ userTrip: app.globalData.userInfo.trip }, () => {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 联系客服
   */
  openSupport() {
    wx.makePhoneCall({ phoneNumber: '13473350611', fail: () => {} });
  },
});
