const {resolve}=require('path');
//分离css代码
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
//压缩css
const OptimizeCSSPlugin=require('optimize-css-assets-webpack-plugin');
//
const HtmlWebpackPlugin=require('html-webpack-plugin');

const WorkboxWebpackPlugin=require('workbox-webpack-plugin');

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

    new WorkboxWebpackPlugin.GenerateSW({

      clientsClaim: true,
      skipWaiting: true
    })
  ],
  mode:'production',
  externals:{
    //拒绝被打包进来
    jquery:'jQuery'
  }
}