// loader 1.下载   2使用 配置loader
// plugins 1.下载 2.引入  3 使用
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={

  entry:'./src/index.js',
  output:{
    filename:"built.js",
    path:resolve(__dirname,"build")
  },
  module:{
    rules:[]
  },
  plugins:[
    //功能：默认会创建 一个空的HTML 自动引入打包输出的所有资源(JS/CSS)
    new HtmlWebpackPlugin({
      // This 复制path 这个文件 并自动引入打包输出的所有资源
      template:'./src/index.html'
    })
  ],
  mode:"development"
}