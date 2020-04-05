const {resolve}=require('path');

const HtmlWebpackPlugin=require('html-webpack-plugin');
/* 
   modify
    代码分割
  
 */
process.env.NODE_ENV="production"

module.exports={
  entry:{
    //单入口=>多入口 :有一个入口 
    main:'./src/js/index.js',
    test:'./src/js/test.js',
  },
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
  mode:'production',
  devtool:'source-map'
}