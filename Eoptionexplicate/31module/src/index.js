import a from './add.js';

import('./count.js')
.then(({default:jian})=>{
  console.log('====================================');
  console.log(jian(2,4));
  console.log('====================================');
})
.catch(()=>{

})
console.log('====================================');
console.log(a(2,5));
console.log('====================================');