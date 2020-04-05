const {resolve}=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
  /* 
      entry 入口
        1. String 
        打包形成一个chunk 输出一个bundle.js
        2. array   entry:['./src/index.js','./src/add.js'],
        多入口
        所有的入口文件 最后会形成一个chunk 只有一个bundle 
        --> 只有在HMR 功能中让html热更新生效
        3. object
        entry:{
          index:'./src/index.js',
          add:'./src/add.js',
        },
        有几个入口 就形成几个chunk 输出几个bundle文件
        chunk名字  为 key
        --特殊用法 类似 dll entry
        ->{

        }
   */
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