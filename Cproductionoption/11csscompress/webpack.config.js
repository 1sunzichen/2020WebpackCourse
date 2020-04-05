const {resolve}=require('path');
// 设置html 模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
//分离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
//设置 node 环境变量 为开发环境 默认生产环境
// process.env.NODE_ENV="development";
// 
// optimize-css-assets-webpack-plugin 压缩css
module.exports={
  entry:'./src/js/index.js',
  output:{
    filename:'js/build.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use: [
          //'style-loader',
          //提取js的css 成单独文件 替换 style-loader 
          MiniCssExtractPlugin.loader,
          'css-loader',
          //css 兼容性处理 1 postcss=>postcss-loader 2 postcss-preset-env
          //帮postcss 找到package.json中browserslist中的配置 通过配置 加载指定的兼容性
          //3 package.json中browserslist中的配置 默认 生产环境
          //process.env.NODE_ENV=development 设置 node 环境变量
          //使用loader 的默认配置
          //'postcss-loader' 修改配置
          {
            loader:'postcss-loader',
            options:{
              ident:'postcss',
              plugins:()=>[
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename:'css/build.css'
    }),
    new OptimizeCSSPlugin()
  ],
  mode:'development'
}
