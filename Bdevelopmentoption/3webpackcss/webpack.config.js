// webpack.config.js webpack 的 配置文件

// 作用 指示 webpack 干那些活 当你运行 webpack 指令时 会加载里面的配置
// 所有的构建工具 都是基于nodejs 平台运行的 模块化默认采用common.js

// resolve 用来拼接绝对路径的方法

const {resolve} = require("path");
module.exports={
  //webpack 配置
  entry:'./src/index.js',
  //输出
  output:{
    filename:'built.js',
    // __dirname nodejs 变量  当前文件的目录绝对路径
    path:resolve(__dirname,'build')
  },
  //loader的配置
  module:{
    rules:[
      //详细loader配置
      {
        //匹配 那些文件
        test:/\.css$/,
        // 使用哪些loader 进行处理
        use:[
        //执行顺序 从下到上 依次执行
        //创建style标签  将js样式资源插入进行 添加head 中生效 
        'style-loader',
        //css 文件变成commonjs 模块 加载到js中，里面内容是样式字符串
        'css-loader'
        ]
      },{
        test: /\.less$/,
        use:[
          'style-loader',
          'css-loader',
          //less-loader 和 less
          'less-loader'
        ]
      }
    ]
  },
  //插件
  plugins:[],
  //模式 development production
  mode: 'development',
}