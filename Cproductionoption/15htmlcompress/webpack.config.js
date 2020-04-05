
const {resolve}=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
module.exports={
  entry:"./src/js/index.js",
  output:{
    filename:'js/build.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      // modify-start
      minify:{
        //移除空格
        collapseWhitespace:true, 
        //移除注释
        removeComments:true
      }
      // modify-end
    }),
  ],
  //modify生产环境自动压缩
  mode:"production"
}