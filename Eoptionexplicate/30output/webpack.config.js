const {resolve}=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={

  entry:'./src/index.js',
  output:{
    // 文件名称(指定名称+目录)
    filename:'js/[name].js',
    // 所有输出资源的公共目录
    path:resolve(__dirname,'build'),
    /* 所有资源引入的公共路径前缀  
    'imgs/a.jpg' ---> '/imgs/a.jpg'
    / 服务器地址补充
     */
    publicPath:'/',
    //非入口chunk的名称
    chunkFilename:'js/[name]_chunk.js',
    // 暴露全局变量
    library:'[name]',
    // 暴露给 browser 浏览器
    //libraryTarget:'window',
    libraryTarget:'commonjs',
  },
  plugins:[
    new HtmlWebpackPlugin({
     
    })
  ],
  mode:'development'
}