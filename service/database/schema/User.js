const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


//创建用户Schema
const userSchema = new Schema({
  UserId: ObjectId,
  username: {unique: true, type: String},
  password: String,
  createAt: {type: Date, default: Date.now()},
  lastLoginAt: {type: Date, default: Date.now()}
})


//发布模型
mongoose.model('User', userSchema)
