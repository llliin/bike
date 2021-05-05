import UserModel from './services/model/user.model';

App({
  onLaunch() {
    // 初始化云服务
    wx.cloud.init();
  },
  globalData: {
    // 用户信息
    userInfo: new UserModel(),
  },
});
