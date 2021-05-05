/**
 * 经纬度
 */
export default class GeoModel {
  /**
   * 纬度
   * @type {number}
   */
  lat = 0;

  /**
   * 经度
   * @type {number}
   */
  lng = 0;

  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }
}
