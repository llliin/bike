import ridingOrderService from '../../services/riding-order';
import { formatDuration } from '../../utils/timeUtil';

Page({
  page: 1,
  data: {
    loadState: 0,
    list: [],
  },
  onLoad() {
    this.loadData();
  },

  /**
   * 加载列表数据
   */
  async loadData() {
    this.setData({ loadState: 1 });
    const res = await ridingOrderService.myOrder(this.page);
    this.setData(
      {
        loadState: res.length === 0 ? 2 : 0,
        list: this.data.list.concat(
          res.map(e => ({
            ...e,
            duration: formatDuration(e.startTime, e.endTime),
          }))
        ),
        page: ++this.page,
      },
      () => {
        wx.stopPullDownRefresh();
      }
    );
  },

  toDetail(ev) {
    wx.navigateTo({
      url: `/pages/record-detail/record-detail?id=${ev.currentTarget.dataset.id}`,
    });
  },
  onPullDownRefresh() {
    this.data.list = [];
    this.page = 1;
    this.loadData();
  },
  onReachBottom() {
    if (this.data.loadState === 0) {
      this.loadData();
    }
  },
});
