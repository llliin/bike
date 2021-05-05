import ridingOrderService from '../../services/riding-order';
import helper from '../../utils/helper';

Page({
  data: {
    orderData: null,
  },
  async onLoad(options) {
    helper.$load('加载中...');
    // 获取订单信息
    const data = await ridingOrderService.getOrder(options.id);
    data.startTime = data.startTime.toString();
    data.endTime = data.endTime.toString();
    this.setData({ orderData: data }, () => {
      helper.$close();
    });
  },
});
