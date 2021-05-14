import helper from '../../utils/helper';
import userService from '../../services/user';

const { formatDate } = require('../../utils/timeUtil');
let app = getApp();
Page({
  data: {
    cardsDate: [0, 0, 0],
    money:[10,25,80],
    num:""
  },
  onLoad() {
    this.syncCardState();
  },

  async select(ev) {
    helper.$load('开通中...', true);
    const util = this.getVipDate(ev.currentTarget.dataset.type);
    if (ev.currentTarget.dataset.type==1){
  this.data.num=0
  }else if(ev.currentTarget.dataset.type==2){
    this.data.num=1
  }else{
    this.data.num=2
  };
    if (app.globalData.userInfo.balance >= this.data.money[this.data.num]) {
      const res = await userService.setVip(util,this.data.money[this.data.num]);
      if(res){
      helper.$close();
      app.globalData.userInfo.vip = util;
      helper.$alert({
        title: '开通成功',
        content: `骑行卡将在${formatDate(util)}到期`,
      });
      this.syncCardState();
    }
    }else{
      helper.$toast('余额不足');
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
