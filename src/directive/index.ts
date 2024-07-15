import hasDemo from './demo/hasDemo';

// eslint-disable-next-line func-names
const directive = function (Vue) {
  Vue.directive('hasDemo', hasDemo);
};

export default directive;
