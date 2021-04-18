import helper from './helper';

/**
 * 同步用户位置
 * @returns {Promise<{lng: (number), lat: (number)}>}
 */
export async function syncUserLocation() {
  try {
    const res = await helper.$getLocation();
    return { lng: res.result.location.lng, lat: res.result.location.lat };
  } catch (err) {
    if (err.errMsg && err.errMsg.includes('auth deny')) {
      await helper.$alert({ content: '您还没有开启定位权限，请前往设置开启' });
      wx.openSetting();
    } else {
      helper.$alert({ content: '获取位置信息失败' });
    }
  }
}
