// const pinia = createPinia();
import './nui.scss';
import 'uno.css';
import 'vue3-hash-calendar/es/index.css';

// import { createPinia } from 'pinia';
import { createSSRApp } from 'vue';
import VueHashCalendar from 'vue3-hash-calendar';

// #ifdef H5
import directive from '@/directive';

// #endif
import api from './apis';
import App from './App.vue';
import pinia from './router/pinia';

export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  app.use(VueHashCalendar);
  // #ifdef H5
  app.use(directive);
  // #endif
  api(app);
  return {
    app,
  };
}
