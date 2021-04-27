// 腾讯地图Key
const mapKey = 'RQBBZ-A5TCJ-UT4FD-KBEGP-DDI4S-EEFZM';

var systemInfo = null;

wx.getSystemInfo({
  success: function (res) {
    systemInfo = res;
  },
});

class CommonHelper {
  /**
   * @description toast弹窗
   * @param {String} str 提示语
   * @param {Boolean} icon 显示的图标
   * @param {Boolean} mask 是否为遮罩模式
   * @param {Number} time 显示时间
   * @return {Promise}
   */
  $toast(str = '', icon = 'none', mask = false, time = 1500) {
    let q = new Promise(r => {
      wx.showToast({
        icon: icon,
        title: str,
        duration: time,
        mask: mask,
      });
      setTimeout(() => {
        r();
      }, time);
    });
    return q;
  }

  /**
   * @description loading弹窗
   * @param {String} str 提示语
   * @param {Boolean} mask 是否为遮罩模式
   */
  $load(str = '加载中...', mask = false) {
    wx.showLoading({
      title: str,
      mask: mask,
    });
  }

  /**
   * @description 关闭loading弹窗
   */
  $close = wx.hideLoading;

  /**
   * @description modal模态弹窗
   * @param {Object} options 配置项
   * @return {Promise<boolean>}
   */
  $confirm(options) {
    let q = new Promise(r => {
      wx.showModal({
        title: options.title || '提示',
        content: options.content || '',
        confirmText: options.confirmText || '确定',
        confirmColor: options.confirmColor || '#576B95',
        cancelText: options.cancelText || '取消',
        cancelColor: options.cancelColor || '#000000',
        success: e => {
          if (e.confirm) r(true);
          else r(false);
        },
      });
    });
    return q;
  }

  /**
   * @description alert弹窗
   * @param {Object} options 配置项
   * @return {Promise}
   */
  $alert(options) {
    let q = new Promise((r, j) => {
      wx.showModal({
        title: '提示',
        content: options.content || '',
        showCancel: false,
        confirmText: options.btnText || '确定',
        confirmColor: options.btnColor || '#576B95',
        success: e => {
          if (e.confirm) r();
          else j();
        },
      });
    });

    q.then(
      () => {},
      () => {}
    );
    return q;
  }

  /**
   * @description ActionSheet模态弹窗
   * @param {Array} list 选项列表
   * @param {String} color 颜色
   * @return {Promise}
   */
  $menu(list, color = '#000000') {
    let q = new Promise((r, j) => {
      wx.showActionSheet({
        itemList: list,
        itemColor: color,
        success: e => {
          r(e.tapIndex);
        },
        fail: () => {
          j();
        },
      });
    });

    return q;
  }

  /**
   * @description 获取图片对应宽度的高度
   * @return {Promise}
   */
  $getImageHeight(src, width = wx.getSystemInfoSync().screenWidth) {
    let q = new Promise((r, j) => {
      wx.getImageInfo({
        src: src,
        success: e => {
          let percent = e.width / e.height;
          r((width / percent).toFixed(2));
        },
        fail: e => {
          j(e);
        },
      });
    });
    return q;
  }

  /**
   * @description 登录接口
   * @return {Promise}
   */
  $login() {
    let q = new Promise((r, j) => {
      wx.login({
        success: e => {
          r(e.code);
        },
        fail: () => {
          j();
        },
      });
    });
    return q;
  }

  /**
   * @description 获取定位信息
   */
  $getLocation() {
    this.$load('定位中...');
    let q = new Promise((r, j) => {
      wx.getLocation({
        geocode: true,
        type: 'gcj02',
        success: e => {
          wx.request({
            url:
              'https://apis.map.qq.com/ws/geocoder/v1/?location=' +
              e.latitude +
              ',' +
              e.longitude +
              '&key=' +
              mapKey,
            success: res => {
              r(res.data);
            },
            fail: err => {
              j(err);
            },
            complete: () => {
              this.$close();
            },
          });
        },
        fail: err => {
          this.$close();
          j(err);
        },
      });
    });
    return q;
  }

  /**
   * @description rpx转px
   * @param {Object} rpx
   */
  $rpx2px(rpx) {
    let percent = 750 / systemInfo.windowWidth;
    return rpx / percent;
  }
}

const helper = new CommonHelper();
export default helper;
