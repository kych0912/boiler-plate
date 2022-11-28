const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,//띄여쓰기 제거
        unique:1//똑같은 이메일 작성 불가
    },
    password:{
        type:String,
        minlength:5,
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image:String,
    token:{
        type:String,
    },
    tokenExp:{
        type:Number,
    }
})

const User = mongoose.model('User',userSchema)

module.exports = {User};