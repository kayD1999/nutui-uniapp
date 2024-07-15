import presetWeapp from 'unocss-preset-weapp';

// import unocssUniappUpx from './packages/unocss-uniapp-upx/index';

// 小程序预设

// import { transformerAttributify,transformerClass } from 'unocss-preset-weapp/transformer';

// import presetRemToUPx from './packages/preset-rem-to-px/index';

// console.log('presetRemToUPx',presetRemToUPx())

export default {
  presets: [
    presetWeapp(),

    // presetRemToUPx()

    // unocssUniappUpx(),
  ],

  // transformers: [

  //     transformerAttributify(),

  //     transformerClass()

  // ],

  shortcuts: [{ center: 'flex items-center justify-center' }],
};
