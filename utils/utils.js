import helper from './helper';

const app = getApp();
/**
 * 异步延迟t毫秒
 * @param t {number} 时长(ms)
 * @return {Promise<void>}
 */
export function sleep(t) {
  return new Promise(r => setTimeout(r, t));
}

/**
 * 检查用户押金状态
 */
export async function checkUserDeposit() {
  if (!app.globalData.userInfo.deposit) {
    const c = await helper.$confirm({
      title: '押金缴纳',
      content: '您还未缴纳押金，暂时无法骑行哦~',
      confirmText: '去缴纳',
    });
    if (c) wx.navigateTo({ url: '/pages/deposit/deposit' });
  }
  return app.globalData.userInfo.deposit;
}
