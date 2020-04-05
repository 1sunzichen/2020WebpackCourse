const {resolve}=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
  /* 
   
   */
  entry:'./src/js/index.js',
  output:{
    // 文件名称(指定名称+目录)
    filename:'js/[name].js',
    // 所有输出资源的公共目录
    path:resolve(__dirname,'build'),

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
  mode:'development',
  devServer: {
    //运行代码的目录
    contentBase:resolve(__dirname,'build'),
    //监视 contentbase目录下的所有文件 一旦文件发生变化就会reload
    watchContentBase:true,
    
    watchOptions:{
      //忽略文件
      ignored:/node_modules/,
    },
    // 启动gzip的压缩
    compress:true,
    // 端口号 5000
    port:5000,
    //域名
    host:'localhost',
    //自动打开浏览器
    open:true,
    //HMR
    hot:true,
    // 不要显示启动服务器日志信息
    clientLogLevel:'none',
    // 除了一些启动信息以外 其他内容都不要显示
    quiet:true,
    // 如果出错了 不要全屏提示
    overlay:true,
    //服务器代理 解决开发环境 跨域问题
    proxy:{
      //一旦devserver(5000)服务器 接收到请求 api  
      // 就会转发到另外一个服务器 3000
      '/api':{
        //后端提供的地址
        target:'http://localhost:3000',
        pathRewrite:{
          '^/api':''
        }
      }
    }


  }
}