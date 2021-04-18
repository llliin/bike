import { syncUserLocation } from '../../utils/location';
import UserMarker from '../../map/user-marker';
import BikeMarker from '../../map/bike-marker';
import helper from '../../utils/helper';
import userService from '../../services/user';
import bikeService from '../../services/bike';
import { noSign } from '../../config';

const app = getApp();

Page({
  // Map上下文
  mapContext: null,
  // 标记点列表
  markers: [],

  data: {
    lng: 0,
    lat: 0,
    scale: 16,
  },
  async onLoad() {
    const user = await userService.login();
    app.globalData.balance = user.balance;
    app.globalData.userId = user._id;
    this.update();
  },
  onShow() {
    if (app.globalData.userId) this.update();
  },

  onReady() {
    this.mapContext = wx.createMapContext('map', this);
  },

  async update() {
    this.markers = [];
    await this.updateUserPoint();
    await this.updateBikePoint();
    this.updateMarkers();
  },

  // 更新用户标记点
  async updateUserPoint() {
    const { lat, lng } = await syncUserLocation();
    this.setData({ lng, lat });
    this.markers.push(new UserMarker(lng, lat));
  },

  // 更新共享单车的点位信息
  async updateBikePoint() {
    const bikes = await bikeService.getBikes();
    bikes.forEach(e => {
      this.markers.push(new BikeMarker(e.lng, e.lat));
    });
  },

  // 更新渲染标记点列表
  updateMarkers() {
    this.mapContext.addMarkers({ markers: this.markers, clear: true });
  },

  /**
   * 扫描二维码
   */
  scan() {
    wx.scanCode({
      onlyFromCamera: true,
      success: async res => {
        if (res.result.includes(noSign)) {
          const bikeNo = res.result.replace(noSign, '');
          wx.navigateTo({ url: '/pages/bike-info/bike-info?no=' + bikeNo });
        } else {
          helper.$alert({ title: '提示', content: '请扫描ZZL单车二维码' });
        }
      },
    });
  },

  /**
   * 移动到当前定位
   */
  moveToCurrent() {
    this.mapContext.moveToLocation();
    setTimeout(() => {
      this.setData({ scale: 16.1 }, () => this.setData({ scale: 16 }));
    }, 800);
    this.update();
  },

  toFeedback() {
    wx.navigateTo({ url: '/pages/feedback/feedback' });
  },
});
