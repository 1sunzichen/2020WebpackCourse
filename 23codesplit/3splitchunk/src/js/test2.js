 async function reqTest(){
   try{
                          //打包ID=》改成固定名字
     let res=await import(/*  webpackChunkName:'test'*/'./test.js');
       console.log(res);
   }
   catch(err){
     console.log('====================================');
     console.log(err);
     console.log('====================================');
   }
 }
 module.exports=reqTest;