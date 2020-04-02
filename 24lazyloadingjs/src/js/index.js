console.log('====================================');
console.log('index');
console.log('====================================');
// import {mul} from './test.js'; 
document.getElementById('btn').onclick =function(){
  //modify 懒加载 当用户需要时才加载  预加载 webpackPrefetch:true 兼容性差 高版本PC端 慎用
  // 正常加载  可以认为是并行加载 (同一时间加载多个文件) 
  // 预加载 prefetch 等其他资源加载完毕了 浏览器空闲了 在偷偷加载资源
   import (/*  webpackChunkName:'test',webpackPrefetch:true */'./test.js').then(({mul})=>{
      console.log('====================================');
      console.log(mul(4,5));
      console.log('====================================');
   })
}