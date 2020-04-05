const {resolve}=require('path');
module.exports ={
  entry:'./index.js',
  output:{
    filename:'[name].js',
    path:resolve(__dirname,'build')
  },
  mode:'production'
}