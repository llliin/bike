import feedbackService from '../../services/feedback';
import { formatDuration, formatTime } from '../../utils/timeUtil';

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
    const res = await feedbackService.myOrder(this.page);
    this.setData(
      {
        loadState: res.length === 0 ? 2 : 0,
        list: this.data.list.concat(
          res.map(e => ({
            ...e,
            type: (e.type),
            recordTime:formatTime(e.time),     
            bikeno:(e.no)  
          }))
        ),
        page: ++this.page,
      },
      () => {
        wx.stopPullDownRefresh();
      }
    );    
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
