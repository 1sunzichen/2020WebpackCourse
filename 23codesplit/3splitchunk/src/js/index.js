// import '@babel/polyfill';
// import { mul } from './test';
/* 
  通过js代码 让 某个文件单独打包成一个chunk
 */
import req from './test2.js';
import Ajv from 'Ajv';
import aproba from 'aproba';
export default async()=> {
let a=await req();
console.log('====================================');
console.log(a,'a');
console.log('====================================');
// import(/*  webpackChunkName:'test'*/'./test.js')
// .then((res)=>{
//   console.log('====================================');
//   console.log('suc',res);
//   console.log('====================================');
// })
// .catch(()=>{
//   console.log('====================================');
//   console.log('fill');
//   console.log('====================================');
// })
// eslint-disable-next-line
console.log(Ajv,aproba);
}