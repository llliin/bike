// 数据库连接实例
const db = wx.cloud.database();

export default class Service {
  db = db;
  /**
   * @type {DB.DatabaseCommand}
   */
  cmd = db.command;

  collection = null;

  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  /**
   * 返回当前用户id
   */
  getUID() {
    const app = getApp();
    if (app.globalData.userInfo._id) {
      return getApp().globalData.userInfo._id;
    } else {
      return wx.getStorageSync('userId');
    }
  }
}
