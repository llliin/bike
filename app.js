App({
  onLaunch() {
    // 初始化云服务
    wx.cloud.init();
  },
  globalData: {
    balance: 0,
    userId: null,
  },
});
