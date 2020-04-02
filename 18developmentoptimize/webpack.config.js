const {resolve}=require('path');
const HtmlWebpackPlugin=require("html-webpack-plugin");
/* HMR   它允许在运行时更新所有类型的模块，而无需完全刷新。
  一个模块发生变化 只会重新打包这一个模块 而不是打包所有模块
  样式文件 可以使用HMR功能 因为style-loader内部实现了
  js 文件      默认不能使用HMR功能 非入口js文件
  index.js 文件加入 
      if(module.hot){
      // 一旦module hot属性 开启HMR功能=>让HMR生效
      module.hot.accept('./print.js',()=>{
        //方法监听printjs 其他不会重新打包构建
        print();
      })
    }
  html 文件    HMR：不能更新 
  解决： entry: 加入 ['./src/index.js','./src/index.html'], 完全刷新
  只有一个文件 不需要做HMR功能
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
  }
}