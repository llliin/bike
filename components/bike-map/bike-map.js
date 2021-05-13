import { syncUserLocation } from '../../utils/location';
import UserMarker from '../../map/user-marker';
import bikeService from '../../services/bike';
import BikeMarker from '../../map/bike-marker';
import GeoModel from '../../services/model/geo.model';
import helper from '../../utils/helper';

const app = getApp();

Component({
  // Map上下文
  mapContext: null,
  // 标记点列表
  markers: [],
  properties: {
    /**
     * 隐藏单车标记
     */
    hideBikes: { type: Boolean, value: false },
  },
  data: { lng: 0, lat: 0, scale: 16 },
  pageLifetimes: {
    show() {
      if (app.globalData.userId) this.update();
    },
  },
  lifetimes: {
    ready() {
      this.mapContext = wx.createMapContext('map', this);
      this.update();
    },
  },
  methods: {
    async update() {
      this.markers = [];
      await this.updateUserPoint();
      if (!this.data.hideBikes) await this.updateBikePoint();
      this.updateMarkers();
    },

    // 更新用户标记点
    async updateUserPoint() {
      const { lat, lng } = await syncUserLocation();
      this.setData({ lng, lat });
      this.triggerEvent('sync-position', new GeoModel(lat, lng));
      if (!this.data.hideBikes) this.markers.push(new UserMarker(lng, lat));
    },

    // 更新共享单车的点位信息
    async updateBikePoint() {
      const bikes = await bikeService.getBikes();
      bikes.forEach(e => {
        this.markers.push(new BikeMarker(e.position.lng, e.position.lat));
      });
    },

    // 更新渲染标记点列表
    updateMarkers() {
      this.mapContext.addMarkers({ markers: this.markers, clear: true });
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
      if(app.globalData.userInfo.ridingOrderId===null){
        wx.navigateTo({ url: '/pages/feedback/feedback' });
      }else{
        helper.$toast('请先结束骑行！');
      }
    },
  },
});
