// import '@babel/polyfill';
import '../css/index.css';
import { mul } from './test';


// eslint-disable-next-line
console.log(mul(2,4));
/*
   modify
   注册serviceworker
   处理兼容性问题
   需要修改package.json 中eslintConfig的配置
   "env":{
      browser:"true"//支持浏览器的变量
   }
 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('====================================');
        console.log('sn注册成功了');
        console.log('====================================');
      })
      .catch(() => {
        console.log('失败');
      });
  });
}
