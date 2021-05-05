import { formatDate } from '../../utils/timeUtil';

const app = getApp();
Page({
  data: {
    deposit: false,
    balance: 0,
    vip: '已过期()',
  },
  onShow() {
    const vip = formatDate(app.globalData.userInfo.vip);
    this.setData({
      deposit: app.globalData.userInfo.deposit,
      balance: app.globalData.userInfo.balance,
      vip: `${
        app.globalData.userInfo.vip > new Date() ? '生效中' : '已过期'
      }(${vip})`,
    });
  },
});
