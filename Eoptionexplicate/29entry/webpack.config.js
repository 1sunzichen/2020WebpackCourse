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
  entry:{
    index:['./src/index.js','./src/count.js'],
    add:'./src/add.js',
  },
  output:{
    filename:'[name].js',
    path:resolve(__dirname,'build')
  },
  plugins:[
    new HtmlWebpackPlugin({
     
    })
  ],
  mode:'development'
}