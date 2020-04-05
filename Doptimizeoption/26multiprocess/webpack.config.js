const {resolve}=require('path');
//分离css代码
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
//压缩css
const OptimizeCSSPlugin=require('optimize-css-assets-webpack-plugin');
//
const HtmlWebpackPlugin=require('html-webpack-plugin');

const WorkboxWebpackPlugin=require('workbox-webpack-plugin');
//定义nodejs 环境变量
/* 
   modify

  tree shaking 去除无副作用用代码 
    前提： 1. 必须使用ES6模块化 2.开启production 环境
    作用代码体积
    "sideEffects": false 所有代码都没有副作用 都可以进行tree shaking
    "sideEffects": ["*.css"] 不进行treeshaking
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
            use:[
            /* 
              modify 开启多进程打包
              进程启动 600ms
              通信也有开销 
              只有工作消耗时间比较唱 才需要多进程打包
            */
              // 'thread-loader', 默认方式
              {
                loader:'thread-loader',
                options: {
                  workers: 2//进程为二
                }
              },
              {
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
                    // 
                    //开启babel 缓存
                    //第二次构建读取缓存
                    cacheDirectory:true
                  }
              }
            ]
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
                          // 
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
    }),
    // modify
    new WorkboxWebpackPlugin.GenerateSW({
     /* 
        1.帮助serviceworker快速启动
        2.删除旧的serviceworker
        生成一个serviceworker 配置文件
      */
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  mode:'production',
  devtool:'source-map'
}