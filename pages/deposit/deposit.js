import { syncUserInfo } from '../../utils/utils';
import userService from '../../services/user';
import helper from '../../utils/helper';

const app = getApp();

Page({
  data: {
    hasDeposit: false,
    loading: false,
  },
  onLoad() {
    this.setData({ loading: true });
    this.loadState();
  },

  /**
   * 加载押金状态
   * @return {Promise<void>}
   */
  async loadState() {
    const data = await syncUserInfo();
    this.setData({ hasDeposit: data.deposit, loading: false });
    
  },

  /**
   * 缴纳押金
   * @param ev {Event}
   * @return {Promise<void>}
   */
  async postDeposit(ev) {
    this.setData({ loading: true });
    const state = ev.target.dataset.state;
    const s = state ? '缴纳' : '退还';
    
    if (app.globalData.userInfo.balance >= 0) {
      await userService.deposit(state);
      helper.$toast(`押金${s}成功！`, 'success', false, 2000);
      app.globalData.userInfo.deposit = state;
    } else if(app.globalData.userInfo.balance <= 0) {
      helper.$toast(`押金${s}失败！`, 'error', false, 2000);

    }
    this.loadState();
  },
});
