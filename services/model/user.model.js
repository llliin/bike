import BaseModel from './base.model';

export default class UserModel extends BaseModel {
  /**
   * 余额
   * @type number
   */
  balance = 0;

  /**
   * 押金状态
   * @type {boolean}
   */
  deposit = false;

  /**
   * 会员卡到期时间
   * @type {Date}
   */
  vip = new Date('1970-01-01');

  /**
   * 骑行次数
   * @type {number}
   */
  trip = 0;

  /**
   * 用户骑的单车id
   * @type {BikeModel._id}
   */
  ridingBikeId = null;
}
