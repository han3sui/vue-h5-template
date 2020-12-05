const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  outputDir: process.env.outputDir,
  assetsDir: 'assets',
  publicPath: process.env.VUE_APP_MODE === 'production' ? 'https://cdn.xx.com/oss' : '',
  lintOnSave: true,
  runtimeCompiler: true, // 包含运行时编译器的 Vue 构建版本
  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
  /* 添加分析工具 */
  chainWebpack: (config) => {
    // 移除全局preload 插件
    config.plugins.delete('preload')
    // 移除全局prefetch 插件
    config.plugins.delete('prefetch')
    // 打包分析
    if (process.env.npm_config_report) {
      config.plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end()
    }
    // 更改图片资源地址到cdn
    config.module
      .rule('images')
      .test(/\.(jpe?g|png|gif|svg)$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000, // 单位byte，小于9kb的将转换成base64
        // 以下配置项用于配置file-loader
        // 根据环境使用cdn或相对路径
        publicPath: process.env.NODE_ENV === 'production' ? 'https://cdn.xx.com/oss' : '',
        // 将图片打包到dist/img文件夹下, 不配置则打包到dist文件夹下
        outputPath: 'assets/img',
        // 配置打包后图片文件名
        name: '[name].[ext]'
      })
      .end()
  },
  css: {
    // 不用在每一个页面都进行引入样式，就能直接引用。
    loaderOptions: {
      sass: {
        prependData: '@import \'@/assets/css/index.scss\';'
      }
    }
  },
  configureWebpack: () => {
    return {
      plugins: [new CompressionPlugin({
        /** gzip压缩**/
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
        threshold: 10240,
        deleteOriginalAssets: false,
        minRatio: 0.8

        /** Brotli压缩**/
        // filename: '[path].br[query]',
        // algorithm: 'brotliCompress',
        // test: /\.(js|css|html|svg)$/,
        // compressionOptions: { level: 11 },
        // threshold: 10240,
        // minRatio: 0.8,
        // deleteOriginalAssets: true
      })]
    }
  },
  // 配置 webpack-dev-server 行为。
  productionSourceMap: false,
  devServer: {
    hot: true,
    disableHostCheck: true,
    open: false,
    host: '0.0.0.0',
    port: 9100,
    https: false,
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
    proxy: null, // string | Object
    before: app => {
    }
  }
}
