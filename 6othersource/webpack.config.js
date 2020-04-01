
const {resolve}=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
  entry:'./src/index.js',
  output:{
    filename:'build.js',
    path:resolve(__dirname, 'build')
  },
  module:{
    rules:[
      {test: /\.css$/, 
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      //打包其他资源
      {
        //排除 其他css/js/html 资源
        exclude:/\.css|js|html$/,
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]'
          
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode:'development'

}