import { syncUserInfo } from '../../utils/utils';
import userService from '../../services/user';
import helper from '../../utils/helper';


Page({
  data: {
    balance: 0,
    value: '',
  },
  onLoad() {
    this.loadData();
  },
  async charge(ev) {
  if (ev.detail.target.id==="ch"){
    const value = Number(ev.detail.value.v);
    if (value) {
      helper.$load('充值中', true);
      const res = await userService.charge(value);
      if (res) {
        await this.loadData();
        helper.$alert({
          content: '充值成功',
        });
      }
    } else {
      helper.$toast('请输入充值金额');
    }
  }else if(ev.detail.target.id==="re"){
    const value = Number(ev.detail.value.v);
    if (value& this.data.balance >=value) {
      helper.$load('退款中', true);
      const res = await userService.refund(value);
      if (res) {
        await this.loadData();
        helper.$alert({
          content: '退款成功',
        });
      }
    }
    else if( this.data.balance <value) {
      helper.$toast('您输入的金额过大');
    }
    else {
      helper.$toast('请输入退款金额');
    }
  }
  },



  async loadData() {
    helper.$load('加载中..', true);
    const data = await syncUserInfo();
    this.setData({ balance: data.balance, value: '' });
    helper.$close();
  },
});
