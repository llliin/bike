import { formatNumber } from '../../utils/timeUtil';

Component({
  properties: {
    time: { type: Number },
  },
  data: { hours: 0, minutes: 0, seconds: 0 },
  observers: {
    // 计算出时分秒
    time(newValue) {
      const h = Math.floor(newValue / 3600);
      const m = Math.floor((newValue - h * 3600) / 60);
      const s = newValue - h * 3600 - m * 60;
      this.setData({
        hours: formatNumber(h),
        minutes: formatNumber(m),
        seconds: formatNumber(s),
      });
    },
  },
  methods: {},
});
