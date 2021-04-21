import bikeService from "../../services/bike";

Page({
  data: {},
  async onLoad(option) {
    const bikeInfo = await bikeService.getBikeInfo(option.no);
    console.log(bikeInfo);
  },
});
