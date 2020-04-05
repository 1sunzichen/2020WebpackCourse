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
  resolve:{
    //配置模块路径别名
    alias:{ 
      $css:resolve(__dirname,'src/css')
    },
    //配置省略文件的别名
    extensions:['.js','.json','.jsx','.css'],
    // 告诉webpack 解析模块 去哪个目录
    modules:[resolve(__dirname,'../../node_modules'),'node_modules']
  }
}