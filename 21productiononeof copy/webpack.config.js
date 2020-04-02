const {resolve}=require('path');
//分离css代码
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
//压缩css
const OptimizeCSSPlugin=require('optimize-css-assets-webpack-plugin');
//
const HtmlWebpackPlugin=require('html-webpack-plugin');
//定义nodejs 环境变量
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
  entry:'./src/index.js',
  output:{
    filename:'js/build.js',
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
        //modify：oneOf 中的文件只匹配一种loader
        oneOf: [
            {
              test: /\.(css|less)$/,
              use:[
                // 'style-loader',
                ...commonCssLoader
                // less兼容性做不了
                'less-loader'
              ]
            },
      //正常来讲 一个文件只能被一个 loader 处理 
      //        一个文件要被多个loader处指定loader执行的前后顺序
      //先执行eslint 在执行babel           
      
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
                      firefox::50,
                    }
                  }
                ],

              ]
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
    new MiniCssExtractPlugin（{
      filename:'css/build.css'
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
  mode:'production'
}