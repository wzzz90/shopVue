const mongoose = require('mongoose');
const db = 'mongodb://localhost/simple-db';
const glob = require('glob');
const {resolve} = require('path');

mongoose.Promise = global.Promise

exports.connect = () => {
  //连接数据库
  mongoose.connect(db)
  
  let maxConnectTimes = 0;
  
  return new Promise((resolve, reject) => {
    //增加数据库链接的事件监听
    mongoose.connection.on('disconnected', () => {
      console.log('--------数据库断开-------')
      if(maxConnectTimes < 3) {
        maxConnectTimes++
        //进行重连
        mongoose.connect(db)
      } else {
        reject();
        throw new Error('数据库出现问题，请进行处理')
      }
      
    })    
    
    
    mongoose.connection.on('error', err => {
      console.log('--------数据库错误--------')
      if(maxConnectTimes < 3) {
        maxConnectTimes++
        //进行重连
        mongoose.connect(db)
      } else {
        reject();
        throw new Error('数据库出现问题，请进行处理')
      }
      
    })
    
      
    //链接打开的时候
    mongoose.connection.once('open', () => {
      console.log('MongoDB connected successfully')
      resolve()
    })
    
  })
  
}

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}
