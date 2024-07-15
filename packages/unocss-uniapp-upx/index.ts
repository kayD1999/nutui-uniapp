/*
 * @Description:
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2024-02-22 09:27:13
 * @FilePath: \ruoyi-ui\packages\unocss-tdesign-class\index.ts
 */
import { definePreset } from 'unocss';

import { rules } from './rules';

console.log('rules', rules);

export const unocssTdesignClass = definePreset(() => {
  return {
    name: 'unocss-uniapp-upx',
    rules,
  };
});

export default unocssTdesignClass;
