Page({
  data: {},

  onShow() {},

  onPullDownRefresh() {},

  /**
   * 联系客服
   */
  openSupport() {
    wx.makePhoneCall({ phoneNumber: '13473350611', fail: () => {} });
  },
});
