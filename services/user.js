import Service from './service';
import UserModel from './model/user.model';
import bikeService from './bike';
import ridingOrderService from './riding-order';

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
    model._id = c._id;
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
   * @return {Promise<boolean|RidingOrderModel>}
   */
  async startRiding(bikeId, lat, lng) {
    try {
      // 锁定单车状态
      const bikeState = await bikeService.startRiding(bikeId);
      if (bikeState) {
        // 创建订单
        const order = await ridingOrderService.creatOrder(bikeId, lat, lng);
        // 绑定用户的骑行单车
        const { stats } = await this.collection
          .doc(this.getUID())
          .update({ data: { ridingOrderId: order._id } });
        return stats.updated === 1 ? order : false;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * 结束骑行
   * @return {Promise<false | { payment: number }>}
   */
  async finishRiding(expense) {
    try {
      // 获取用户的当前余额和会员状态
      const { data } = await this.collection
        .field({ vip: true, balance: true })
        .get();
      const isVip = data[0].vip >= new Date();
      // 更新用户数据字段
      const { stats } = await this.collection.doc(this.getUID()).update({
        data: {
          trip: this.cmd.inc(1),
          ridingOrderId: null,
          // 会员到期时间需要大于当前时间
          balance: isVip ? data[0].balance : this.cmd.inc(-expense),
        },
      });
      return stats.updated === 1 ? { payment: isVip ? 2 : 1 } : false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * 开通Vip
   * @return {Promise<boolean>}
   */
  async setVip(util = new Date()) {
    try {
      const { stats } = await this.collection.doc(this.getUID()).update({
        data: { vip: util },
      });
      return stats.updated === 1;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * 余额充值
   * @return {Promise<boolean>}
   */
  async charge(num) {
    try {
      const { stats } = await this.collection.doc(this.getUID()).update({
        data: { balance: this.cmd.inc(num) },
      });
      return stats.updated === 1;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

const userService = new UserService();
export default userService;
