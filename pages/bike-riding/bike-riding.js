Page({
  timer: null,
  data: {
    startTime: 0,
    time: 0,
  },
  onLoad() {
    this.data.startTime = Date.now();
  },
  onShow() {
    this.setData(
      { time: Math.floor((Date.now() - this.data.startTime) / 1000) },
      () => {
        if (this.timer === null) this.startTimer();
      }
    );
  },
  onHide() {
    clearTimeout(this.timer);
    this.timer = null;
  },

  onUnload() {
    clearTimeout(this.timer);
    this.timer = null;
  },

  /**
   * 骑行计时
   */
  startTimer() {
    this.timer = setTimeout(() => {
      this.setData({ time: ++this.data.time });
      this.startTimer();
    }, 1000);
  },
});
