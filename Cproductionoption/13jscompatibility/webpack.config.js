
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
      //js 兼容性处理 babel-loader 
      // 1 @babel/core 2 @babel/preset-env 3 babel-loader
      //问题：promise 不能转化
      // modify-start;
      // 2 全部的兼容性处理 => @babel/polyfill
      //问题：我只要解决部分的兼容性问题 但是有的兼容性代码隐去 体积太大了
      // 3 需要做兼容性处理 按需加载 =》 core-js   1&3 结合
      {
        test:/\.js$/,
         //排除
        exclude:/node_modules/,
        loader: 'babel-loader',
        options:{
          //指示babel做怎样的兼容性处理
          presets:[
            ['@babel/preset-env',{
              // 按需加载 
              useBuiltIns:'usage',
              // 到哪个版本
              corejs:{
                version:3
              },
              //指定兼容性做到哪个版本浏览器
              targets:{
                chrome:60,
                firefox:60,
                ie:'9',
                safari:'10',
                edge:'17'
              }
            }]
          ],
        }
      }
      // modify-end;
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
  ],
  mode:"development"
}