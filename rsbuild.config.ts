import { defineConfig } from '@rsbuild/core';
import { pluginVue2 } from '@rsbuild/plugin-vue2';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginCheckSyntax } from '@rsbuild/plugin-check-syntax';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';

const isDev = process.env.NODE_ENV === 'development';

const entry = {
  'test-page': './src/pages/test-page/entry.js',
};

// ['record-portrait', 'record-replay', 'record-aigc'].forEach(chapterType => {
//   entry[chapterType] = `./src/pages/${chapterType}/main.js`;
// });

export default defineConfig({
  plugins: [
    pluginVue2(),
    pluginSass(),
    // pluginLess(),
    pluginCheckSyntax({
      ecmaVersion: 5,
    }),
  ],
  tools: {
    rspack: {
      plugins: [
        // 仅在 RSDOCTOR 为 true 时注册插件，因为插件会增加构建耗时
        process.env.RSDOCTOR && new RsdoctorRspackPlugin(),
      ].filter(Boolean),
      // output: {
      //   asyncChunks: false,
      // },
    },
    // lightningcssLoader: false,
  },
  source: {
    entry,
    include: [
      /node_modules[\\/]pinia[\\/]/,
      /node_modules[\\/]uuid[\\/]/,
      /node_modules[\\/]@vue[\\/]devtools-api[\\/]/,
    ],
    decorators: { version: 'legacy' }
    // alias: {
    //   '@': './src',
    // },
  },
  html: {
    mountId: 'app',
    template: './public/index.html',
    inject: false,
    tags: [
      {
        tag: 'script',
        publicPath: false,
        head: false,
        attrs: {
          src: 'https://cdn.bootcdn.net/ajax/libs/eruda/3.2.1/eruda.min.js',
        },
      },
      {
        tag: 'script',
        publicPath: false,
        head: false,
        children: 'window.eruda && window.eruda.init();',
      },
    ],
  },
  output: {
    polyfill: 'entry',
    dataUriLimit: 102400,
    legalComments: 'none',
    sourceMap: {
      js: isDev
        ? // 开发模式使用性能更好的 source map 格式
        'cheap-module-source-map'
        : // 生产模式使用高质量的 source map 格式
        'source-map',
    },
    // filenameHash: false,
    // distPath: {
    //   js: '',
    // },
    // injectStyles: true,
  },
  // performance: {
  //   chunkSplit: {
  //     strategy: isDev ? 'split-by-experience' : 'all-in-one',
  //   },
  // },
});
