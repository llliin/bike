import bikeService from '../../services/bike';
import helper from '../../utils/helper';
import { sleep } from '../../utils/utils';
import userService from "../../services/user";

const app = getApp();

Page({
  data: {},
  async onLoad(option) {
    await sleep(3000);
    // 获取单车信息
    const bikeInfo = await bikeService.getBikeInfo(option.no);
    // 如果此单车处于空闲状态，跳转骑行页面
    if (
      bikeInfo.bikeState === 1 &&
      (await userService.startRiding(bikeInfo._id))
    ) {
      app.globalData.currentBike = bikeInfo;
      wx.redirectTo({ url: '/pages/bike-riding/bike-riding' });
    } else {
      await helper.$alert({ content: '此单车暂时不可以骑行呦~' });
      wx.navigateBack();
    }
  },
});
