const {resolve}=require('path');

const HtmlWebpackPlugin=require('html-webpack-plugin');
/* 
   modify
    代码分割
    optimization:{
      splitChunks:{
        chunks:'all'
      }
    },
    可以将node_modules 中代码单独打包一个chunk最终输出
    自动分析多入口chunk中 有没有公共的文件 如果有会打包成单独的chunk
 */
process.env.NODE_ENV="production"

module.exports={
  entry:'./src/js/index.js',
  output:{
              //modify  重命名           
    filename:'js/[name].[contenthash:10].js',
    path:resolve(__dirname,'build')
  }, 
  module:{
   
  },
  plugins:[
  
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{
        //移除空格
        collapseWhitespace: true, 
        //关闭注释
        removeComments: true
      }
    })
  ],
  //
  optimization:{
    splitChunks:{
      chunks:'all'
    }
  },
  mode:'production',
  devtool:'source-map'
}