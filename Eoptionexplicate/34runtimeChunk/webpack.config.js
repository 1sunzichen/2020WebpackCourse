const {resolve}=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const terserWebpackPlugin= require('terser-webpack-plugin');
module.exports={
  /* 
   
   */
  entry:'./src/js/index.js',
  output:{
    // 文件名称(指定名称+目录)
    filename:'js/[name].[contenthash:10].js',
    // 所有输出资源的公共目录
    path:resolve(__dirname,'build'),
    chunkFilename:'js/[name].[contenthash:10]_chunk.js'

  },
  module:{
    rules: [
      //loader配置
      {
        test:/\.css$/,
        // 多个loader 用use
        use:['style-loader','css-loader']
      },
      
    ]
  },
  plugins:[
    new HtmlWebpackPlugin()
  ],
  mode:'production',
  optimization: {
    splitChunks:{
      chunks:'all',
      // 以下都是默认值

      // minSize:30*1024, //分割的chunk最小为30Kb
      // maxSiza:0,// 最大没有限制
      // minChunks:1, //最少别引用一次
      // maxAsyncRequests:5, //按需加载是并行加载最大数量为5
      // maxInitialRequests:3, //入口文件 最大并行请求数量最大为3
      // automaticNameDelimiter:"~",//名称连接符
      // name:true,//可以使用命名规则
      // catchGroups:{//分割chunk的组
      //   vendors:{//node_modules 文件会被打报到vendors 组的chunk中--> vendor~0.js
      //     //满足大小超过30kb 至少被引用一次
      //     test:/[\\/]node_modules[\\/]/,
      //     //优先级
      //     priority:-10,
      //   },
      //   default:{
      //     //要提取的chunk最少被引用2次
      //     minChunks:2,
      //     //优先级
      //     priority:-20,
      //     /* 
      //       如果当前要打包的模块 和之前已经被
      //       提取的模块是用一个 就会复用 而不是重新打包
      //      */
      //     reuseExistingChunks:true
      //   }
      // }
    },
    //缓存持久化 解决 修改a文件 导致 b文件的contenthash的变化
    runtimeChunk:{
      name:entrypoint=>`runtime-${entrypoint.name}`
    },
    minimizer:[
      //生产环境压缩方案
      new terserWebpackPlugin({
        //开启缓存
        cache:true,
        //开启多进程打包
        parallel:true,
        //启动sourceMap
        sourceMap: true
      })
    ]

  }
}