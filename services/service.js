// 数据库连接实例
const db = wx.cloud.database();

export default class Service {
  db = db;

  collection = null;

  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }
}
