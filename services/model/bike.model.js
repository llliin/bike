import BaseModel from './base.model';

export default class BikeModel extends BaseModel {
  /**
   * 单车信息
   * @type {string}
   */
  bikeInfo = '暂无信息';

  /**
   * 单车编号
   * @type {string}
   */
  bikeNo = 'zzl000000';

  /**
   * 经度
   * @type {number}
   */
  lng = 0;

  /**
   * 纬度
   * @type {number}
   */
  lat = 0;

  /**
   * 单车状态 0=损坏；1=空闲；2=占用；3=离线；
   * @type {number}
   */
  bikeState = 1;
}
