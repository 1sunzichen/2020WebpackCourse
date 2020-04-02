// import '@babel/polyfill';
// import { mul } from './test';
/* 
  通过js代码 让 某个文件单独打包成一个chunk
 */

import(/*  webpackChunkName:'test'*/'./test.js')
.then((res)=>{
  console.log('====================================');
  console.log('suc',res);
  console.log('====================================');
})
.catch(()=>{
  console.log('====================================');
  console.log('fill');
  console.log('====================================');
})
// eslint-disable-next-line

