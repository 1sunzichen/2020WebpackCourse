// index.js webpack 入口起点文件

// 运行指令
// webpack  ./src/index.js -o ./build/built.js --mode=development  
// -o 打包   开发环境
// 生产环境
// webpack  ./src/index.js -o ./build/built.js --mode=production  

//结论
//1 webpack能处理 js/json 资源 不能 处理 css/images资源
//2 生产环境和开发环境将ES6模块化 编译成浏览器能识别的模块化
//3 
// import './index.css';
import data from './data.json';
function add(a,c){
  return a+c
}
console.log('====================================');
console.log(add(1,4),data);
console.log('====================================');