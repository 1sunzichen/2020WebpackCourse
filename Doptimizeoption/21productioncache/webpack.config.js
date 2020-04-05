const {resolve}=require('path');
//分离css代码
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
//压缩css
const OptimizeCSSPlugin=require('optimize-css-assets-webpack-plugin');
//
const HtmlWebpackPlugin=require('html-webpack-plugin');
//定义nodejs 环境变量
/* 
  modify
    缓存:
    babel缓存
      cacheDirectory:true
    文件资源缓存
      hash: 每次webpack构建会生成一个唯一的hash值
            文件是js和css同时使用一个hash值 
            重新打包 会导致所有缓存失效 （我却只改动一个文件）
      chunkhash   根据chunk生成的hash值 如果打包来源于同一个chunkhash
                  那么hash只就一样
                  问题：js 和 css 值 还是一样的
                  因为 css 实在一个js 中被引入的
      contenthash 根据文件的内容生成 hash 不同文件的hash值一定不一样 
                   =》上线代码运行缓存更好使用
 */
process.env.NODE_ENV="production"
//复用cssloader
const commonCssLoader = [
     MiniCssExtractPlugin.loader,
          'css-loader',
          {
            //还需要 
            loader:'postcss-loader',
            options:{
              ident:'postcss',
              plugins:()=>[
                require('postcss-preset-env')
              ]
            }
          },
]
module.exports={
  entry:'./src/js/index.js',
  output:{
                      //modify
    filename:'js/build.[contenthash:10].js',
    path:resolve(__dirname,'build')
  }, 
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude:/node_modules/,
        // eslint 优先执行 在执行babel
        enforce:'pre',
        loader:'eslint-loader',
        options: {
          fix:true
        }
      },
      {
 
        oneOf: [
            {
              test: /\.(css|less)$/,
              use:[
                // 'style-loader',
                ...commonCssLoader,
                // less兼容性做不了
                'less-loader'
              ]
            },
        
      
          {
            test: /\.js$/,
            exclude:/node_modules/,
            loader:'babel-loader',
            options:{
              presets:[
                ['@babel/preset-env',
                  {
                    useBuiltIns:'usage',
                    corejs:{
                      version:3
                    },
                    targets:{
                      chrome:60,
                      firefox:50,
                    }
                  }
                ],

              ],
              //modify
              //开启babel 缓存
              //第二次构建读取缓存
              cacheDirectory:true
            }
          },
          {
            test:/\.(jpg|gif|png)$/,
            loader:'url-loader',
            options:{
              limit:8*1024,
              name:'[hash:10].[ext]',
              outputPath:"imgs",
              esModule:false
            }
          },
          {
            test:/\.html$/,
            loader:'html-loader',

          },
          {
              exclude:/\.(js|css|less|gif|png|svg|jpg|html)/,
              loader:'file-loader',
              options:{
                outputPath:'media'
            }
          }
          ]
        }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
                          //modify
      filename:'css/build.[contenthash:10].css'
    }),
    new OptimizeCSSPlugin(),
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{
        //移除空格
        collapseWhitespace: true, 
        //关闭注释
        removeComments: true
      }
    })
  ],
  mode:'production',
  devtool:'source-map'
}