import Service from './service';
import BikeModel from './model/bike.model';
import { formatDuration } from '../utils/timeUtil';

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
      .field({ position: true })
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

  /**
   * 获取单车信息
   * @param bikeId {string} 单车Id
   * @returns {Promise<BikeModel>}
   */
  async getBikeInfoById(bikeId) {
    const { data } = await this.collection.doc(bikeId).get();
    return new BikeModel().connect(data);
  }

  /**
   * 开始骑行，锁定单车
   * @param bikeId {string} 单车Id
   * @return {Promise<boolean>}
   */
  async startRiding(bikeId) {
    try {
      const { stats } = await this.collection
        .doc(bikeId)
        .update({ data: { bikeState: 2 } });
      return stats.updated === 1;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * 结束骑行
   * @param bikeId {string} 单车Id
   * @param times {number} 单车使用时间
   * @return {Promise<boolean>}
   */
  async finishRiding(bikeId,times) {
    try {
      const { stats } = await this.collection
        .doc(bikeId)
        .update({ 
          data: { bikeState: 1, bikeNumber: this.cmd.inc(1),bikeAllTime: this.cmd.inc(times) } 
        })
      return stats.updated === 1;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  // 获取时间（毫秒）转换为时分秒
  async finishTimes(bikeId){
    try {
      const bikeContent = await bikeService.getBikeInfoById(bikeId)
      const bikeTime =formatDuration(0,bikeContent.bikeAllTime)
      // console.log(bikeTime)
      const { stats } = await this.collection
        .doc(bikeId)
        .update({ 
          data: { bikeTime:bikeTime } 
        })
      return stats.updated === 1;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * 标记损坏
   * @param no {string} 单车编号
   * @return {Promise<boolean>}
   */
  async bikeBroken(no) {
    try {
      const { stats } = await this.collection
        .where({ bikeNo: no })
        .update({ data: { bikeState: 0 } });
      return stats.updated === 1;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

const bikeService = new BikeService();
export default bikeService;
