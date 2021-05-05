import helper from '../../utils/helper';
import userService from '../../services/user';

const { formatDate } = require('../../utils/timeUtil');
let app = getApp();
Page({
  data: {
    cardsDate: [0, 0, 0],
  },
  onLoad() {
    this.syncCardState();
  },

  async select(ev) {
    helper.$load('开通中...', true);
    const util = this.getVipDate(ev.currentTarget.dataset.type);
    const res = await userService.setVip(util);
    if (res) {
      helper.$close();
      app.globalData.userInfo.vip = util;
      helper.$alert({
        title: '开通成功',
        content: `骑行卡将在${formatDate(util)}到期`,
      });
      this.syncCardState();
    }
  },

  syncCardState() {
    this.setData({
      cardsDate: this.data.cardsDate.map((_, i) =>
        formatDate(this.getVipDate(i + 1))
      ),
    });
  },

  getVipDate(type) {
    const now =
      app.globalData.userInfo.vip.getTime() > Date.now()
        ? new Date(app.globalData.userInfo.vip.getTime())
        : new Date();

    switch (Number(type)) {
      case 1:
        return new Date(now.setMonth(now.getMonth() + 1));
      case 2:
        return new Date(now.setMonth(now.getMonth() + 3));
      case 3:
        return new Date(now.setFullYear(now.getFullYear() + 1));
    }
  },
});
