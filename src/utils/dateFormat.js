/**
 * 中国标准时间转换为 yyyy-mm-dd
 * @param {Object} date 标准时间
 * @param {Object} isTime 是否显示时间
 */
export function standardToNYR(date, isTime) {
  const d = new Date(date);
  const Y = `${d.getFullYear()}-`;

  const M = `${d.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
  const D = `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()} `;
  const h = `${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}:`;
  const m = `${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}:`;
  const s = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
  let time;
  if (isTime) {
    time = Y + M + D + h + m + s;
  } else {
    time = Y + M + D;
  }
  return time;
}

/**
 * 中国标准时间转换与 yyyy-mm-dd ，转换成时间戳
 * @param {Object} date 标准时间
 * @param {string} unit 单位
 */
export function getTimeStamp(date, unit = 's') {
  let d = date ? new Date(date).getTime() : new Date().getTime(); // 时间戳-毫秒
  if (unit === 's') {
    // 时间戳-秒
    d = parseInt(d / 1000, 10);
  }
  return d;
}

/**
 * 获取t-1日日期
 */
export function getDateOfPreviousDay() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const seperator1 = '-';
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`;
  }
  return year + seperator1 + month + seperator1 + strDate;
}

//  邹华
/** *****
 * @description:  获取指定日期
 * @param {*} dayV  日期值，正数表示未来日期，负数表示过去日期
 * @param {*} formatV    日期格式，可选参数，默认为 yyyy-mm-dd
 * @param {*} specifyV   指定日期，可选参数，默认为 当天
 * @return {*}
 *
 * 使用示例：
 * utils.getTnDate(-1, 'yyyy-mm-dd') => 2023-03-17
 * utils.getTnDate('abc', 'yyyy-mm-dd') => 2023-03-16
 * utils.getTnDate(1, 'yyyy-mm-dd') => 2023-03-16
 * utils.getTnDate(1, 'yy-mm-dd') => 21-03-16
 * utils.getTnDate(1, 'mm-dd') => 03-16
 * utils.getTnDate(1, 'dd') => 31
 * utils.getTnDate(1) => 2023-03-16
 * utils.getTnDate(1, 'yyyy/mm/dd') => 2023/03/16
 * utils.getTnDate(1, 'yyyy/mm/dd', '2022-05-24') => 2022/05/23
 *
 * object 参数使用示例：
 * utils.getTnDate({
 *  dayValue: 1,
 *  format: 'yyyy/mm/dd',
 *  specify: '2022-05-24',
 * }) => 2023/03/16
 *
 * utils.getTnDate({ dayValue: 1 }) => 2023-03-16
 * utils.getTnDate({ format: 'yyyy/mm/dd' }) => 2023-03-16
 */
export function getTnDate(dayV = 0, formatV = 'yyyy-mm-dd', specifyV = null) {
  let parameters = {
    dayValue: dayV,
    format: formatV,
    specify: specifyV,
  };
  if (typeof dayV === 'object') {
    parameters = Object.assign(parameters, dayV);
    // console.log(parameters);
  }
  const { dayValue, specify } = parameters;
  let { format } = parameters;

  const date = specify ? new Date(specify) : new Date();
  date.setDate(date.getDate() - (Number(dayValue) || 0));
  // console.log(date);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  if (format) {
    if (format.indexOf('yyyy') !== -1) {
      format = format.replace('yyyy', year);
    } else if (format.indexOf('yy') !== -1) {
      format = format.replace('yy', year.toString().slice(2));
    }
    if (format.indexOf('mm') !== -1) {
      format = format.replace('mm', month);
    }

    if (format.indexOf('dd') !== -1) {
      format = format.replace('dd', day);
    }
    return format;
  }
  return `${year}-${month}-${day}`;
}
