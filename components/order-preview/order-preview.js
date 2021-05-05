import { formatTime } from '../../utils/timeUtil';
import helper from '../../utils/helper';

Component({
  properties: {
    orderId: String,
    money: Number,
    payment: Number,
    start: String,
    end: String,
    startLat: Number,
    startLng: Number,
    endLat: Number,
    endLng: Number,
  },
  data: {
    orderNo: '',
    payType: '未支付',
    startTime: '',
    endTime: '',
    startPosition: '',
    endPosition: '',
    time: 0,
  },
  lifetimes: {
    async ready() {
      this.setData({
        orderNo: this.data.orderId.substring(0, 16),
        payType:
          this.data.payment === 0
            ? '未结算'
            : this.data.payment === 1
            ? '余额支付'
            : '骑行卡',
        startTime: formatTime(new Date(this.data.start)),
        endTime: formatTime(new Date(this.data.end)),
        time: Math.floor(
          (new Date(this.data.end) - new Date(this.data.start).getTime()) / 1000
        ),
        startPosition:
          (
            await helper.$getPositionInfo(
              this.data.startLat,
              this.data.startLng
            )
          )?.result?.formatted_addresses?.recommend ?? '',
        endPosition:
          (await helper.$getPositionInfo(this.data.endLat, this.data.endLng))
            ?.result?.formatted_addresses?.recommend ?? '',
      });
    },
  },
  methods: {},
});
