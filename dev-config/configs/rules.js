
/**
 * 文件处理
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ } = require('./constants')
const lessLoaderVars = {}
//是否分离格式
const isExtractCss = false
/**
 * 获取样式规划
 */
const styleLoader = { loader: 'style-loader', options: { sourceMap: false } }
function getStyleRules(isExtract) {
  return [
    ...(isExtract ? [] : [styleLoader]), //extract 时需要注释
    {
      loader: 'css-loader',
      options: {
        importLoaders: 3,
        minimize: !__DEV__,
        sourceMap: false
      }
    },
    {
      loader: 'postcss-loader',
      query: JSON.stringify(require('./utils').postCSSConfig)
    },
    {
      loader: 'less-loader',
      options: {
        modifyVars: lessLoaderVars,
        sourceMap: false
      }
    },
    {
      loader: 'stylefmt-loader',
      options: {
        config: '.stylelintrc'
      }
    }
  ]
}
let rules = [ // 定义各种loader
  {
    test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)$/,
    use: [{
      loader: 'url-loader',
      options: { limit: 8192, name: 'assets/generates/[hash].[ext]' }
    }]
  },
  {
    test: /\.(less|css)$/,
    use: isExtractCss ? ExtractTextPlugin.extract({
      fallback: styleLoader,
      use: getStyleRules(true)
    }) : getStyleRules(false)
  },
  {
    test: /\.tsx?$/,
    enforce: 'pre',
    loader: 'tslint-loader',
    options: {
      fix: true,
      emitErrors: true
    }
  }
]

if (__DEV__) {
  rules.push({
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    use: [
      { loader: 'react-hot-loader' },
      {
        loader: 'ts-loader',
        options: {
          jsx: true,
          happyPackMode: true,
          transpileOnly: true,
        }
      }
    ]
  })
} else {
  //生产环境
  rules.push({
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    use: [{
      loader: 'ts-loader',
      options: { jsx: true }
    },
    {
      loader: 'strip-loader',
      options: { strip: ['logger.info', 'logger.debug', 'console.log', 'console.debug'] }
    }
    ]
  })
}
module.exports = rules
