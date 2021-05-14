import helper from '../../utils/helper';
import { noSign } from '../../config';
import feedbackService from '../../services/feedback';

Page({
  data: {
    // 最后一项永远是其它问题
    range: [
      '把手损坏',
      '座椅损坏',
      '轮胎损坏',
      '链条损坏',
      '车筐损坏',
      '其它问题',
    ],
    select: -1,
    no: null,
  },
  change(e) {
    this.setData({ select: Number(e.detail.value) });
  },
  scan() {
    helper.$load('等待扫描结果');
    wx.scanCode({
      onlyFromCamera: true,
      success: async res => {
        helper.$close();
        if (res.result.includes(noSign)) {
          this.setData({ no: res.result.replace(noSign, '') });
        } else {
          helper.$alert({ title: '提示', content: '请扫描ZZL单车二维码' });
        }
      },
      fail: () => {
        helper.$close();
      },
    });
  },
  async submit(ev) {
    const content = ev.detail.value.content || '';
    if (this.data.select < 0) {
      return helper.$alert({ content: '请选择问题类型' });
    }
    if (!this.data.no) {
      return helper.$alert({ content: '请扫描单车二维码' });
    }
    helper.$load('提交中..');
    const res = await feedbackService.create(
      this.data.range[this.data.select],
      this.data.no,
      this.data.select === this.data.range - 1,
      content
    );
    helper.$close();
    if (res) {
      await helper.$alert({ content: '反馈成功' });
      wx.navigateBack();
    }else{
      return helper.$alert({ content: '反馈成功' });
    }
  },
});
