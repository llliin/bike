import BaseModel from './base.model';
import GeoModel from './geo.model';

/**
 * 单车
 */
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
   * 单车位置
   * @type {GeoModel}
   */
  position = new GeoModel();

  /**
   * 单车状态 0=损坏；1=空闲；2=占用；3=离线；
   * @type {number}
   */
  bikeState = 1;
}
