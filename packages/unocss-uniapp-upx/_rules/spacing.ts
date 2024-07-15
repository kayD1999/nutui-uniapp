/*
 * @Description:
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2024-02-26 14:28:09
 * @FilePath: \ruoyi-ui\packages\unocss-tdesign-class\_rules\spacing.ts
 */
import type { Rule } from '@unocss/core';

export const handlerSpacing = (d: string, prefix: string | Array<string>, a: string = '') => {
  const num = d;

  if (Number.isNaN(d)) {
    return {};
  }
  if (prefix === 'padding-xy') {
    if (a.toLowerCase() === 'x') {
      return {
        'padding-left': `${num}upx`,
        'padding-right': `${num}upx`,
      };
    }
    return {
      'padding-top': `${num}upx`,
      'padding-bottom': `${num}upx`,
    };
  }

  if (prefix === 'padding-TRBL') {
    if (a.toLowerCase() === 'top' || a.toLowerCase() === 't') {
      return {
        'padding-top': `${num}upx`,
      };
    }
    if (a.toLowerCase() === 'right' || a.toLowerCase() === 'r') {
      return {
        'padding-right': `${num}upx`,
      };
    }
    if (a.toLowerCase() === 'bottom' || a.toLowerCase() === 'b') {
      return {
        'padding-bottom': `${num}upx`,
      };
    }
    if (a.toLowerCase() === 'left' || a.toLowerCase() === 'l') {
      return {
        'padding-left': `${num}upx`,
      };
    }
    return {};
  }

  if (prefix === 'margins-xy') {
    if (a.toLowerCase() === 'x') {
      return {
        'margin-left': `${num}upx`,
        'margin-right': `${num}upx`,
      };
    }
    return {
      'margin-top': `${num}upx`,
      'margin-bottom': `${num}upx`,
    };
  }

  if (prefix === 'margins-TRBL') {
    if (a.toLowerCase() === 'top' || a.toLowerCase() === 't') {
      return {
        'margin-top': `${num}upx`,
      };
    }
    if (a.toLowerCase() === 'right' || a.toLowerCase() === 'r') {
      return {
        'margin-right': `${num}upx`,
      };
    }
    if (a.toLowerCase() === 'bottom' || a.toLowerCase() === 'b') {
      return {
        'margin-bottom': `${num}upx`,
      };
    }
    if (a.toLowerCase() === 'left' || a.toLowerCase() === 'l') {
      return {
        'margin-left': `${num}upx`,
      };
    }
    return {};
  }
  if (Array.isArray(prefix)) {
    return Object.fromEntries(prefix.map((key) => [key, `--td-size-${num})`]));
  }
  return {
    [prefix]: `${num}upx`,
  };
};

export const spacing: Rule[] = [
  // ------------------------------------------------ padding ------------------------------------------------
  /**
   * @description: 内边距
   * @return padding
   * @class ('p' | 'pa')-(16以内数字)?
   * 例如  p-1  | pa-2 |
   */
  [/^pa?()-?(-?.+)$/, ([, a, b]: string[]) => handlerSpacing(b, 'padding', a)],
  /**
   * @description: 左右 | 上下 内边距
   * @return padding-left && padding-right | padding-top && padding-bottom
   * @class p-('x' | 'y')-(16以内数字)?
   * 例如  p-x-10  | p-y-10
   */
  [/^p-?([xy])(?:-?(-?.+))?$/, ([, a, b]: string[]) => handlerSpacing(b, 'padding-xy', a)],
  /**
   * @description: 左 | 右 | 上 | 下 内边距
   * @return padding-left | padding-right | padding-top | padding-bottom
   * @class p-('t' | 'r' | 'b' | 'l')-(16以内数字)?
   * 例如  p-t-5  | p-b-5 | p-l-5 | p-r-5
   */
  [/^p-?([rltbse])(?:-?(-?.+))?$/, ([, a, b]: string[]) => handlerSpacing(b, 'padding-TRBL', a)],

  // ------------------------------------------------ margins ------------------------------------------------
  /**
   * @description: 外边距
   * @return margins
   * @class ('m' | 'ma')-(16以内数字)?
   * 例如  m-1  | ma-2 |
   */
  [/^ma?()-?(-?.+)$/, ([, a, b]: string[]) => handlerSpacing(b, 'margin', a)],
  /**
   * @description: 左右 | 上下 内边距
   * @return margins-left && margins-right | margins-top && margins-bottom
   * @class m-('x' | 'y')-(16以内数字)?
   * 例如  m-x-10  | m-y-10
   */
  [/^m-?([xy])(?:-?(-?.+))?$/, ([, a, b]: string[]) => handlerSpacing(b, 'margins-xy', a)],
  /**
   * @description: 左 | 右 | 上 | 下 内边距
   * @return margins-left | margins-right | margins-top | margins-bottom
   * @class m-('t' | 'r' | 'b' | 'l')-(16以内数字)?
   * 例如  m-t-5  | m-b-5 | m-l-5 | m-r-5
   */
  [/^m-?([rltbse])(?:-?(-?.+))?$/, ([, a, b]: string[]) => handlerSpacing(b, 'margins-TRBL', a)],
];
