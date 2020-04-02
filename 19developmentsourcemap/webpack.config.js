const {resolve}=require('path');
const HtmlWebpackPlugin=require("html-webpack-plugin");
/* source-map：一种提供源代码到构建后的 代码映射技术(如果构建后的代码出错,通过映射关系可以追踪
代码错误)
[inline-|hidden-|eval-|][nosource][cheap-[module]]source-map
    source-map 外部
      错误代码提示信息  源代码位置
    inline-source-map:内联    
      1.只生成一个内联的source-map
      错误代码提示信息  源代码位置
    hidden-source-map:外部
      错误代码提示信息  无源代码位置
    eval-source-map:内联
      1.每一个文件都生成对应的source-map  eval
      错误代码提示信息  源代码位置
    nosources-source-map:外部  生产环境
      错误代码提示信息   隐藏源代码
    cheap-source-map:外部
      错误代码提示信息  源代码位置
      只能精确到行
    cheap-module-source-map:外部
      错误代码提示信息  源代码位置
      只能精确到行
    内联速度更快

    开发环境 
    速度:eval》inline》cheap eval-cheap-source-map最快
    调试更友好
    source-map
    cheap-module-source-map 行
    cheap-source-map

    生产环境
    nosources-source-map
*/

module.exports={
  entry:['./src/index.js','./src/index.html'],
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
    //modify 开启HMR功能
    hot:true
  },
  devtool: 'nosources-source-map',
}