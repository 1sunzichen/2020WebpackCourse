
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
      
      //前提：团队工作 语法检查 eslint-loader eslint
      //只检查自己写的源代码 第三方库是不用检查的
      //eslint-config-airbnb 包含检查react 风格的库
      //airbnb -->eslint eslint-plugin-import  eslint-config-airbnb-base
      // 在package.json中写入 "eslintConfig":{
      //   "extends":"airbnb-base"
      // } 
      {  
        test:/\.js$/,
        //排除
        exclude:/node_modules/,
        loader:'eslint-loader',
        options:{
          fix: true
        }
      }
    ]
  },
  plugins:[
    // new HtmlWebpackPlugin({
    //   template:'./src/index.html'
    // }),
  ],
  mode:"development"
}