import helper from '../../utils/helper';
import userService from '../../services/user';
import { noSign } from '../../config';
import { checkUserDeposit } from '../../utils/utils';

const app = getApp();

Page({
  data: {},
  async onLoad() {
    const user = await userService.login();
    app.globalData.userInfo = user;
    checkUserDeposit();
  },

  /**
   * 扫描二维码
   */
  async scan() {
    if (await checkUserDeposit()) {
      wx.scanCode({
        onlyFromCamera: true,
        success: async res => {
          if (res.result.includes(noSign)) {
            const bikeNo = res.result.replace(noSign, '');
            wx.navigateTo({ url: '/pages/opening/opening?no=' + bikeNo });
          } else {
            helper.$alert({ title: '提示', content: '请扫描ZZL单车二维码' });
          }
        },
      });
    }
  },
});
