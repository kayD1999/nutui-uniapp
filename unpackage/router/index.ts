// #endif
// import { routes } from './routes';

// const whiteList = ['register', 'login', 'forget_pwd'];
// const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'];
// list.forEach((item) => {
//   uni.$on(item, {
//     invoke(e) {
//       console.log(e, 'dfdssaaafdfdfd');
//       // 获取要跳转的页面路径（url去掉"?"和"?"后的参数）
//       const url = e.url.split('?')[0];
//       const currentRoute = routes.find((item) => {
//         return url === item.path;
//       });
//       // 需要登录并且没有token
//       if (currentRoute?.auth && !getToken()) {
//         uni.navigateTo({
//           url: '/pages/login/login',
//         });
//         return false;
//       }
//       return e;
//     },
//     fail(err) {
//       // 失败回调拦截
//       console.log(err, 'dfdfdfdfd');
//     },
//   });
// });
