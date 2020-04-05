const {resolve}=require('path');

//
const HtmlWebpackPlugin=require('html-webpack-plugin');

const webpack=require('webpack');

const AddAssetHtmlPlugin=require('add-asset-html-webpack-plugin')
process.env.NODE_ENV="production"
//复用cssloader

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

    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{
        //移除空格
        collapseWhitespace: true, 
        //关闭注释
        removeComments: true
      }
    }),
    //告诉webpack那些库  不参与打包 同时使用时 名称也得变
    new webpack.DllReferencePlugin({
      manifest:resolve(__dirname,'dll/manifest.json')
    }),
    // 将某个文件打包输出   并在html引入该资源
    new AddAssetHtmlPlugin({
      filepath:resolve(__dirname,'dll/jquery.js')
    })
  ],
  mode:'production'
  
}