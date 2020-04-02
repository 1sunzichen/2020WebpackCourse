console.log('====================================');
console.log('index');
console.log('====================================');
import {mul} from './test.js';
document.querySelector('btn').onclick = ()=>{
  console.log('====================================');
  console.log(mul(4,5));
  console.log('====================================');
}