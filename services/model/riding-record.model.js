import BaseModel from './base.model';
import GeoModel from './geo.model';

/**
 * 骑行记录
 */
export default class RidingRecordModel extends BaseModel {
  /**
   * 骑行的起始位置
   * @type {GeoModel}
   */
  start = new GeoModel();

  /**
   * 骑行的结束位置
   * @type {GeoModel}
   */
  start = new GeoModel();

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
}
