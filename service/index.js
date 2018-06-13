const Koa = require('koa');
const mongoose = require('mongoose');
const app = new Koa();

//引入connect
const {connect, initSchemas} = require('./database/init.js');
 
//立即执行函数
(async () =>{
    await connect()
    initSchemas()
    
    const User = mongoose.model('User')
    let Userss = new User(
      {username: 'timer1', password: '123456'}, 
      {username: 'ssss', password: '012345'});
      
    Userss.save().then(() => {
      console.log('插入成功')
    })
    
    let users = await User.findOne({}).exec();

    console.log('----------------')
    console.log(users)
    console.log('----------------')
})()



app.use(async(ctx) => {
  ctx.body = '<h1>hello world</h1>'
})

app.listen(3000, () => {
  console.log('3000')
})
