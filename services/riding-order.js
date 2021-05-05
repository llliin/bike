import Service from './service';
import RidingOrderModel from './model/riding-order.model';
import GeoModel from './model/geo.model';
import userService from './user';
import bikeService from './bike';

class RidingOrderService extends Service {
  constructor() {
    super('riding_order');
  }

  /**
   * 创建订单
   * @return {Promise<RidingOrderModel>}
   */
  async creatOrder(bikeId, lat, lng) {
    const model = new RidingOrderModel();
    model.bikeId = bikeId;
    model.userId = this.getUID();
    model.expense = 2;
    model.start = new GeoModel(lat, lng);
    const c = await this.collection.add({ data: model.create() });
    model._id = c._id;
    return model;
  }

  /**
   * 获取订单信息
   * @return {Promise<RidingOrderModel>}
   */
  async getOrder(orderId) {
    const { data } = await this.collection.doc(orderId).get();
    return data ? new RidingOrderModel().connect(data) : null;
  }

  /**
   * 结束订单
   * @return {Promise<boolean>}
   */
  async finishOrder(orderId, lat, lng) {
    try {
      await this.collection.doc(orderId).update({
        data: {
          endTime: new Date(),
          end: new GeoModel(lat, lng),
          status: 1,
        },
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * 订单结算
   * @param orderId 订单id
   * @param bikeId 单车id
   * @param times 时长（单位：ms）
   * @return {Promise<boolean | { payment: number }>}
   */
  async payOrder(orderId, bikeId, times) {
    try {
      // 按照每15分钟2元
      const expense = Math.ceil(Math.floor(times / 1000) / (15 * 60)) * 2;
      // 更新用户状态和单车状态
      const res = await Promise.all([
        userService.finishRiding(expense),
        bikeService.finishRiding(bikeId),
      ]);
      if (!res.includes(false)) {
        // 更新订单数据
        const { stats } = await this.collection
          .doc(orderId)
          .update({ data: { expense, status: 1, payment: res[0].payment } });
        return stats.updated === 1 && { payment: res[0].payment };
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * 获取我的订单
   * @param page {number}
   * @return {Promise<RidingOrderModel[]>}
   */
  async myOrder(page = 1) {
    const { data } = await this.collection
      .orderBy('start', 'desc')
      .skip(15 * (page - 1))
      .limit(15)
      .get();
    return data?.length ? data.map(e => new RidingOrderModel().connect(e)) : [];
  }
}

const ridingOrderService = new RidingOrderService();
export default ridingOrderService;
