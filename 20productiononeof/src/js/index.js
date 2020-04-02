// import '@babel/polyfill';
const add = function add(x, y) {
  return x + y;
};

// eslint-disable-next-line
const promises = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('suc');
  }, 1000);
});
console.log('====================================');
console.log(add(2, 5), promises);
console.log('====================================');
