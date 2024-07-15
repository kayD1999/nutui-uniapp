export function navigateTo(url) {
  // eslint-disable-next-line
  uni.navigateTo({ url });
}

export function redirectTo(url) {
  // eslint-disable-next-line
  uni.redirectTo({ url });
}

export function reLaunch(url) {
  // eslint-disable-next-line
  uni.reLaunch({ url });
}

export function switchTab(url) {
  // eslint-disable-next-line
  uni.switchTab({ url });
}

export function navigateBack() {
  // eslint-disable-next-line
  uni.navigateBack();
}

export function currentRoute(currentPage) {
  if (!currentPage) {
    // 获取当前页面栈
    const pages = getCurrentPages();
    // 获取当前页面的实例
    currentPage = pages[pages.length - 1];
  }

  const route = {
    path: '',
    fullPath: '',
    query: {},
  };

  // #ifdef H5
  route.path = currentPage.$page.path;
  route.fullPath = currentPage.$page.fullPath;
  route.query = currentPage.$page.options;
  // #endif

  // #ifdef MP-WEIXIN
  route.path = `/${currentPage.route}`;
  route.query = currentPage.options;
  route.fullPath = currentPage?.$page?.fullPath;
  // #endif

  return route;
}
