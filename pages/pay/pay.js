import ridingOrderService from '../../services/riding-order';

Page({
  data: {
    orderData: null,
  },
  async onLoad(options) {
    // 获取订单信息
    const data = await ridingOrderService.getOrder(options.orderId);
    // 通知服务器结算订单
    const payRes = await ridingOrderService.payOrder(
      options.orderId,
      data.bikeId,
      data.endTime - data.startTime
    );
    data.startTime = data.startTime.toString();
    data.endTime = data.endTime.toString();
    data.status = payRes ? 1 : 0;
    if (payRes) data.payment = payRes.payment;
    this.setData({ orderData: data });
  },

  toIndex() {
    wx.reLaunch({
      url: '/pages/index/index',
    });
  },
});
