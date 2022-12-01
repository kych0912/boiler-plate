const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/auth');

//application/x-www-form-urlencoded 정보를 분석
app.use(bodyParser.urlencoded({extended:true}));
//application/json 정보 분석
app.use(bodyParser.json());

app.use(cookieParser());

const config = require('./config/key');

const {User} = require("./models/User");

const mongoose = require('mongoose');

mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,useUnifiedTopology:true
    }).then(()=> console.log("MongoDB Connected..."))
    .catch(err=>console.log(err));

    app.get('/api/hello', (req, res) => res.send('Hello World!~~ '))



app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/api/user/register',(req,res) =>{
  //app은 express, user는 mongoose model
  //user은 document
  const user = new User(req.body);
  //mongoose method
  user.save((err,userInfo)=>{
    if(err) return res.json({success:false,err})
    return res.status(200).json({
      success:true
    })
  })
});

app.post('/api/users/login',(req,res) =>{
  //요청된 이메일을 데이터베이스에서 찾기
  User.findOne({email:req.body.email},(err,userInfo)=>{
    //userInfo is document(subclass of model, so it can be use schema methods)
    if(!userInfo){
      return res.json({
        loginSuccess : false,
        message:"해당 유저 없음"
      })
    }
    else{
      userInfo.comparePassword(req.body.password,(err,isMatch)=>{
        if(!isMatch){
          return res.json({loginSuccess:false,message:"비밀번호가 틀렸습니다."})
        }
        //비번이 맞다면 토큰 생성
        userInfo.generateToken((err,userInfo)=>{
          if(err) return res.status(400).send(err);
          //토큰 쿠키 또는 로컬스토리지에 저장
          res.cookie("x_auth",userInfo.token).status(200).json({loginSuccess:true,userId:userInfo._id})
        })
      })
    }
  })
  //요청된 이메일이 데이터베이스에 있으면 비번 확인
  //맞다면 token 생성
})


app.get('/api/users/auth',auth,(req,res)=>{
  //Take a token from client cookie
  //Find the user after decoding token
  //user is exist, certify
  res.status(200).json({
    _id:req.user._id,
    isAdmin : req.user.role === 0 ?false :true,
    isAuth:true,
    email:req.user.email,
    name:req.user.name,
    lastname:req.user.lastname,
    role:req.user.role,
    image:req.user.image
  })

})

app.get('/api/users/logout',auth,(req,res)=>{
  User.findOneAndUpdate({_id:req.user.id},{token:""},(err,user)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).send({
      success:true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});