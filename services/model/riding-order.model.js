import BaseModel from './base.model';
import GeoModel from './geo.model';

/**
 * 骑行订单
 */
export default class RidingOrderModel extends BaseModel {
  /**
   * 骑行的起始位置
   * @type {GeoModel}
   */
  start = new GeoModel();

  /**
   * 骑行的结束位置
   * @type {GeoModel}
   */
  end = new GeoModel();

  /**
   * 关联的用户Id
   * @type {string}
   */
  userId = '';

  /**
   * 单车Id
   * @type {string}
   */
  bikeId = '';

  /**
   * 开始时间
   * @type {Date}
   */
  startTime = new Date();

  /**
   * 结束时间
   * @type {Date}
   */
  endTime = new Date();

  /**
   * 费用
   * @type {number}
   */
  expense = 0;

  /**
   * 订单状态，0=骑行中；1=已完成；
   * @type {number}
   */
  status = 0;

  /**
   * 支付方式，0=未结算；1=余额结算；2=VIP卡；
   * @type {number}
   */
  payment = 0;
}
