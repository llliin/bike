import { syncUserInfo } from '../../utils/utils';

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
    const data = await syncUserInfo();
    this.setData({ userTrip: data.trip }, () => {
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
