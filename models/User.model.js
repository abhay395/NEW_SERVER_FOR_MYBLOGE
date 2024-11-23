const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:false,default:null},
  isImage:{type:Boolean,default:false},
  image:{type:String,required:false,default:null},
  isActive:{type:Boolean,default:false},
  password:{type:String,required:false},
  bio:{type:String,default:""},
  phone:{type:String,default:""},
});

const User = mongoose.model('User', userSchema);

module.exports = User
