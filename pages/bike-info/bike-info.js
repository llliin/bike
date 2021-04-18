import bikeService from '../../services/bike';

const app = getApp();

Page({
  data: {},
  async onLoad(option) {
    const bikeInfo = await bikeService.getBikeInfo(option.no);
    console.log(bikeInfo);
  },
});
