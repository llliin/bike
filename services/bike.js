import Service from './service';
import BikeModel from './model/bike.model';

class BikeService extends Service {
  constructor() {
    super('bikes');
  }

  /**
   * 获取单车信息
   * @returns {Promise<BikeModel[]>}
   */
  async getBikes() {
    const { data } = await this.collection
      .limit(30)
      .field({ lat: true, lng: true })
      .get();
    return data.map(e => new BikeModel().connect(e));
  }

  /**
   * 获取单车信息
   * @param bikeNo {string} 单车No
   * @returns {Promise<BikeModel>}
   */
  async getBikeInfo(bikeNo) {
    const { data } = await this.collection.where({ bikeNo }).get();
    return new BikeModel().connect(data[0]);
  }
}

const bikeService = new BikeService();
export default bikeService;
