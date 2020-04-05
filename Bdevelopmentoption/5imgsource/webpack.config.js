const {resolve}=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
  entry:'./src/index.js',
  output:{
    filename:"built.js",
    path:resolve(__dirname,"build")
  },
  module:{
    rules:[
      {
        test: /\.less$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        //问题 ：默认处理不了 html中的img图片
        test:/\.(jpg|gif|png)$/,
        //使用一个loader
        // 下载 file-loader url-loader
        loader:"url-loader",
        options:{
          // 图片大小 小于 8kb 就会被base64处理 
          // 优点： 减少请求数量 (减轻服务器压力)
          // 缺点：图片体积更大  文件请求速度更慢
          limit:12*1024,
          // 问题： url-loader 默认使用 es6 模块化 解析
          // html-loader commonjs 解析
          // 解决 关闭url-loader es6
          esModule:false,
          // [hash:10] 取图片的hash的前10位
          // [ext] 原扩展名
          name:'[hash:10].[ext]'
        }
      },
      {
        test:/\.html$/,
        // TODO  处理html文件中的img图片 负责引入 img 从而能被url-loader进行处理
        loader: 'html-loader',
        
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode:'development'
}