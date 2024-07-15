import type { App } from 'vue';

// @ts-ignore
import * as demo from './modules/demo';

export const requests = {
  ...demo,
};

export default function api(app: App<Element>) {
  app.config.globalProperties.$Api = requests;
}
