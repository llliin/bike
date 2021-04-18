export default class BaseModel {
  /**
   * 索引
   * @type string
   */
  _id = '';

  /**
   * 将查询结果和model实例关联
   * @param data {Object}
   * @return BikeModel
   */
  connect(data) {
    const ownProperty = Object.keys(this);
    for (let i = 0; i < ownProperty.length; i++) {
      if (data[ownProperty[i]] !== undefined) {
        this[ownProperty[i]] = data[ownProperty[i]];
      }
    }
    return this;
  }

  /**
   * 创建model的insert数据
   */
  create() {
    const ownProperty = Object.keys(this).filter(e => e !== '_id');
    const data = {};
    for (let i = 0; i < ownProperty.length; i++) {
      data[ownProperty[i]] = this[ownProperty[i]];
    }
    return data;
  }
}
