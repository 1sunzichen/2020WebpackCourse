const {resolve}=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
  /* 
   
   */
  entry:'./src/index.js',
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
      {
        //匹配
        test:/\.js$/,
        //排除
        exclude:/node_modules/,
        //包含
        include:resolve(__dirname,'src'),
        enforce:'pre',
        // post 延后执行
        // pre  先执行
        loader:'eslint-loader',
      },
      {
          //一下配置只会生效一个
        oneOf: [

        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin()
  ],
  mode:'development'
}