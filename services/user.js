import Service from './service';
import UserModel from './model/user.model';

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
    return user.data[0];
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
}

const userService = new UserService();
export default userService;
