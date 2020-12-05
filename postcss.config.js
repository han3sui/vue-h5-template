module.exports = ({
  file
}) => {
  const isVant = file && file.dirname && file.dirname.indexOf('vant') > -1
  const rootValue = isVant ? 37.5 : 75 // 判断条件 请自行调整
  return {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: [
          'Android 4.1',
          'iOS 7.1',
          'Chrome > 31',
          'ff > 31',
          'ie >= 8'
        ]
      },
      'postcss-pxtorem': {
        rootValue: rootValue,
        propList: ['*']
      }
    }
  }
}
