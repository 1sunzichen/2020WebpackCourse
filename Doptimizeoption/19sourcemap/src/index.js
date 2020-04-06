import './index.less';
import './ttf/iconfont.css';
import print from './print.js'
console.log('====================================');
console.log('index.js文件被加载2');
console.log('====================================');
function add(x,y){
  return x-y;
}
print()
console.log(add(3,1));
if(module.hot){
  // 一旦module hot属性 开启HMR功能=>让HMR生效
  module.hot.accept('./print.js',()=>{
    //方法监听printjs 其他不会重新打包构建
    print();
  })
}