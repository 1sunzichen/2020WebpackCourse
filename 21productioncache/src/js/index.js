// import '@babel/polyfill';
import '../css/index.css';

const add = function add(x, y) {
  return x + y;
};

function sum(...args) {
  return args.reduce((a, c) => a + c, 0);
}
// eslint-disable-next-line
const promises =new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('sucx');
  }, 1000);
});
console.log('====================================');
console.log(add(2, 5), promises, sum([1, 2, 3, 1, 1]));
console.log('====================================');
