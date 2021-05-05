import bikeService from '../../services/bike';
import helper from '../../utils/helper';
import { sleep } from '../../utils/utils';
import userService from '../../services/user';

const app = getApp();

Page({
  data: {},
  async onLoad(option) {
    await sleep(3000);
    // 获取单车信息
    const bikeInfo = await bikeService.getBikeInfo(option.no);
    const order = await userService.startRiding(
      bikeInfo._id,
      option.lat,
      option.lng
    );
    // 如果此单车处于空闲状态，跳转骑行页面
    if (bikeInfo.bikeState === 1 && order) {
      wx.redirectTo({
        url: '/pages/bike-riding/bike-riding?orderId=' + order._id,
      });
    } else {
      await helper.$alert({ content: '此单车暂时不可以骑行呦~' });
      wx.navigateBack();
    }
  },
});
