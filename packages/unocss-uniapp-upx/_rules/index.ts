/*
 * @Description:
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2024-02-22 09:27:13
 * @FilePath: \ruoyi-ui\packages\unocss-tdesign-class\_rules\index.ts
 */
import type { Rule } from '@unocss/core';

import { borders } from './border'; // 边框
import { size } from './size'; // 大小
// import { spacing } from './spacing'; // 边距
// import { typography } from './typography'; // 排版

// export const rules: Rule[] = [borders, size, spacing, typography].flat(1);
export const rules: Rule[] = [borders, size].flat(1);
