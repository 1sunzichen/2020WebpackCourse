const {resolve}=require('path');
const HtmlWebpackPlugin=require("html-webpack-plugin");
module.exports={
  entry:'./src/index.js',
  output:{
    filename:'js/built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules: [
      //配置
      {
      test:/\.(less|css)$/,
      use:[
        'style-loader',
        'css-loader',
        'less-loader'
        ]
      },
      // {
      //   //处理 css资源
      //   test:/\.css$/,
      //   use:[
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test:/\.(jpg|gif|png)$/,
        loader:'url-loader',
        options: {
          limit:8*1024,
          esModule:false,
          name:'[hash:10].[ext]',
          outputPath:'imgs'
        }
      },
      {
        //处理html中的img资源
        test: /\.html$/,
        loader:'html-loader',
      },
      {
        exclude:/\.(html|css|less|js|jpg|gif|png)/,
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]',
          //输出路径
          outputPath:'media'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
    })
  ],
  mode:'development',
  devServer: {
    contentBase:resolve(__dirname,'build'),
    //gzip亚索
    compress: true,
    port: 3000,
    open:true,
  }
}