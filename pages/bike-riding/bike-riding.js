import ridingOrderService from '../../services/riding-order';
import helper from '../../utils/helper';
import bikeService from '../../services/bike';
import { formatTime } from '../../utils/timeUtil';

Page({
  timer: null,
  data: {
    id: '',
    startTime: new Date(),
    time: 0,
    no: '',
    orderId: 0,
    showStart: '',
    lat: 0,
    lng: 0,
  },
  async onLoad(options) {
    helper.$load('加载中...', true);
    const errorHanlde = () => {
      helper.$close();
      helper.$toast('获取订单失败', 'error', true).then(() => {
        wx.redirectTo({ url: '/pages/index/index' });
      });
    };
    const order = await ridingOrderService.getOrder(options.orderId);
    if (order) {
      if (order.status === 0) {
        const bike = await bikeService.getBikeInfoById(order.bikeId);
        if (bike) {
          this.setData({
            id: order._id,
            startTime: order.startTime,
            time: Math.floor((Date.now() - order.startTime.getTime()) / 1000),
            no: bike.bikeNo,
            orderId: order._id.substring(0, 16),
            showStart: formatTime(order.startTime),
          });
          helper.$close();
        } else {
          errorHanlde();
        }
      } else {
        wx.redirectTo({ url: `/pages/pay/pay?orderId=${order._id}` });
      }
    } else {
      errorHanlde();
    }
  },
  onShow() {
    if (this.timer === null) this.startTimer();
  },
  onHide() {
    clearTimeout(this.timer);
    this.timer = null;
  },

  onUnload() {
    clearTimeout(this.timer);
    this.timer = null;
  },

  /**
   * 骑行计时
   */
  startTimer() {
    this.timer = setTimeout(() => {
      this.setData({ time: ++this.data.time });
      this.startTimer();
    }, 1000);
  },

  /**
   * 结束骑行
   */
  async finishRiding() {
    // console.log(this.data.lat);
    // console.log(this.data.lng);
    const pos = await helper.$getPositionInfo(this.data.lat, this.data.lng);
    // console.log(pos);
    if(pos.result.ad_info.city_code==156130100){
    helper.$load('', true);
    const res = await ridingOrderService.finishOrder(
      this.data.id,
      this.data.lat,
      this.data.lng
    );
    helper.$close();
    if (res) {
      wx.redirectTo({ url: `/pages/pay/pay?orderId=${this.data.id}` });
    } else {
      helper.$alert({
        content: '订单结束失败，请稍后尝试',
      });
    }
  }else{
    helper.$alert({
      content:'请把车辆停在指定范围内(石家庄市)'
    });
  }
  },

  /**
   * 绑定用户的位置
   * @param ev {{detail:GeoModel}}
   */
  bindUserGeo(ev) {
    this.data.lat = ev.detail.lat;
    this.data.lng = ev.detail.lng;
  },
});
