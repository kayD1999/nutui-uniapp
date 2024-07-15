import axios from '@uni-helper/uni-network';

axios.defaults.headers = { ...(axios.defaults?.headers || {}) };

export default {
  ...axios,
  create: (
    options = {
      baseURL: '',
      timeout: 0,
    },
  ) => axios.create({ ...options, baseUrl: options.baseURL, timeout: options.timeout }),
};
