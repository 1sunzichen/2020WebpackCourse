/* 
    使用dll技术 对某些库 jq antd 单独打包
    当你运行指令时webpack 时 默认查找 webpack.config.js
    需要运行dll文件时
    webpack --config webpack.dll.js
 */
 const {resolve}=require('path');
 const webpack=require('webpack');
 module.exports ={
   entry:{
     jquery:['jquery']
   },
   output:{
     filename: '[name].js',
     path:resolve(__dirname,'dll'),
     library:'[name]_[hash]',//打包的库向外暴露的名字
   },
   plugins:[
     //打包生成一个 mainfest 提供jq 映射
     new webpack.DllPlugin({
       name:'[name]_[hash]',//映射的库暴露的内容
       path:resolve(__dirname,'dll/manifest.json')//输出文件路径
     })
   ]
 }