// import { useThemeStore } from './modules/theme';
import { useTabbarStore } from '@/store/modules/tabbar';
import { useThemeStore } from '@/store/modules/theme';

import { useDemoStore } from './modules/demo';
import { useLoginStore } from './modules/login';
import { useMaskCoverStore } from './modules/maskCover';
import { useResizeStore } from './modules/resize';

export default {
  useDemoStore,
  useResizeStore,
  useLoginStore,
  useThemeStore,
  useTabbarStore,
  useMaskCoverStore,
};
