const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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

//next는 'save'이다
userSchema.pre('save',function(next){
    const user = this;

    if(user.isModified('password')){
        //비밀번호 암호화
        //salt 다음 hash
          bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err)
            //plainpassword, salt, callback
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err)
                user.password = hash;
                next();
            })
        })
    }
    else{
        next();
    }

})
//db에 저장되어 있는 암호화된 비번과 plainpassword를 암호화 하여 비교
//document method들
//model class 의 method 라 생각

userSchema.methods.comparePassword = function(plainpassword,cb){
    bcrypt.compare(plainpassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    let user = this;
    //jsonwebtoken 이용 하여 token 생성
    const token = jwt.sign(user._id.toHexString(),'secretToken');

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
}

//token에 해당하는 user callback
userSchema.statics.findByToken = function(token,cb){
    var user = this;
    console.log(user);
    //decode
    //token = id + secretToken
    jwt.verify(token,'secretToken',function(err,decoded){
        //클라이언트 토큰과 db 토큰 비교
        user.findOne({"_id":decoded,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user);

        })
    }) 
}

const User = mongoose.model('User',userSchema)

//model을 class,document라 생각
//schema를 가지고 있는 인스턴스
//MongoDB로부터 문서를 만들거나 읽을 수 있음
//A model defines a programming interface for interacting with the database
module.exports = {User};