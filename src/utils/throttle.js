// 防抖
export function debounce(fn, delay) {
  let timeout;
  return function deb(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// 节流
export function throttle(fn, interval = 200) {
  let last;
  let timer;
  return function thr(...args) {
    const now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(function thrt() {
        last = now;
        fn.apply(this, args);
      }, interval);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
}
