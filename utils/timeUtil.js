export function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
}

export function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  return [year, month, day].map(formatNumber).join('-');
}

/**
 * 转化汉字时间
 * @param start {Date}
 * @param end {Date}
 * @return {string}
 */
export function formatDuration(start, end) {
  let str = '';
  let duration = end - start;
  const oneHour = 3600000,
    oneMin = 60000,
    oneSec = 1000;
  const hour = Math.floor(duration / oneHour);
  duration -= hour * oneHour;
  str += `${hour}小时`;
  const min = Math.floor(duration / oneMin);
  duration -= min * oneMin;
  str += `${min}分钟`;
  const sec = Math.floor(duration / oneSec);
  str += `${sec}秒`;
  return str;
}

export function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}
