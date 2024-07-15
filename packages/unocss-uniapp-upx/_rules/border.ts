/*
 * @Description:
 * @Version: 1.0
 * @Author: zou hua
 * @Date: 2024-02-22 09:27:13
 * @FilePath: \ruoyi-ui\packages\unocss-tdesign-class\_rules\border.ts
 */
import type { Rule } from '@unocss/core';

export const handlerBorderSize = (d: string, prefix: string | Array<string>, a: string = '') => {
  const num = d;

  if (Number.isNaN(d)) {
    return {};
  }
  if (prefix === 'border-xy') {
    if (a.toLowerCase() === 'x') {
      return {
        'border-left-width': `${num}upx`,
        'border-right-width': `${num}upx`,
      };
    }
    return {
      'border-top-width': `${num}upx`,
      'border-bottom-width': `${num}upx`,
    };
  }

  if (Array.isArray(prefix)) {
    return Object.fromEntries(prefix.map((key) => [key, `${num}upx`]));
  }
  return {
    [prefix]: `${num}upx`,
    color: `blue`,
  };
};

export const borders: Rule[] = [
  // ------------------------------------------------ size ------------------------------------------------
  /**
   * @description: 边框宽
   * @return border-width
   * @class ('border' | 'b')-(16以内数字)?
   * 例如  border-0  |  border-2 |  border-9  |  border-4
   */
  [/^(?:border|b)()(?:-(.+))?$/, ([, , b]: string[]) => handlerBorderSize(b, 'border-width')],
  /**
   * @description: 边框宽
   * @return border-width
   * @class ('border' | 'b')-(width | size)?-(16以内数字)?
   * 例如  border-width-0  |  border-size-2 |  border-width-9  |  border-size-4
   */
  [/^(?:border|b)-()(?:width|size)-(.+)$/, ([, , b]: string[]) => handlerBorderSize(b, 'border-width')],
  /**
   * @description: 上下 | 左右 边框宽
   * @return border-width
   * @class ('border' | 'b')-('x' | 'y')-(width | size)?-(16以内数字)?
   * 例如  border-x-0  |  border-y-2 |  b-y-9  |  b-x-4
   */
  [/^(?:border|b)-([xy])(?:-(.+))?$/, ([, , b]: string[]) => handlerBorderSize(b, 'border-width')],
];
