Page({
  timer: null,
  data: {
    startTime: Date.now(),
    time: 0,
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
