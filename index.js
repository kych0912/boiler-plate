const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

//application/x-www-form-urlencoded 정보를 분석
app.use(bodyParser.urlencoded({extended:true}));
//application/json 정보 분석
app.use(bodyParser.json());

const config = require('./config/key');

const {User} = require("./models/User");

const mongoose = require('mongoose');

mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,useUnifiedTopology:true
    }).then(()=> console.log("MongoDB Connected..."))
    .catch(err=>console.log(err));






app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/register',(req,res) =>{
  //app은 express, user는 mongoose model
  const user = new User(req.body);
  //mongoose method
  user.save((err,userInfo)=>{
    if(err) return res.json({success:false,err})
    return res.status(200).json({
      success:true
    })
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});