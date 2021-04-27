import Service from './service';
import UserModel from './model/user.model';
import bikeService from './bike';
import ridingRecordService from './riding-record';

class UserService extends Service {
  constructor() {
    super('users');
  }

  /**
   * 用户登录
   */
  async login() {
    const res = await wx.cloud.callFunction({ name: 'getOpenid' });
    const openid = res.result.openid;
    let user = await this.collection.where({ _openid: openid }).get();
    // 当搜索不到这个用户时，证明是第一次登录
    if (user.data.length === 0) {
      // 执行注册
      user.data = [await this.registe()];
    }
    const d = new UserModel().connect(user.data[0]);
    wx.setStorageSync('userId', d._id);
    return d;
  }

  /**
   * 用户注册
   * @returns {Promise<UserModel>}
   * @private
   */
  async registe() {
    const model = new UserModel();
    const c = await this.collection.add({ data: model.create() });
    model._id_ = c._id;
    return model;
  }

  /**
   * 获取当前用户
   * @return {Promise<UserModel>}
   */
  async getCurrentUser() {
    const { data } = await this.collection.doc(this.getUID()).get();
    return new UserModel().connect(data);
  }

  /**
   * 缴纳/退还押金
   * @return {Promise<boolean>}
   */
  async deposit(state = true) {
    try {
      const { stats } = await this.collection.doc(this.getUID()).update({
        data: { deposit: state },
      });
      return stats.updated === 1;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * 用户开始骑行
   * @return {Promise<boolean>}
   */
  async startRiding(bikeId) {
    try {
      // 锁定单车状态
      const bikeState = await bikeService.startRiding(bikeId);
      if (bikeState) {
        // 绑定用户的骑行单车
        const { stats } = await this.collection
          .doc(this.getUID())
          .update({ data: { ridingBikeNo: bikeId } });
        const {} = ridingRecordService.addRecord();
        return stats.updated === 1;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

const userService = new UserService();
export default userService;
