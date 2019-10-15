const express=require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("mongoose");
const User = require('./Schemes/userSchema.js');
const bodyParser = require("body-parser");
const url = "mongodb://localhost:27017/users";


mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology:true},(err,db)=>
{
  if (err) {console.log("Error connecting to database");db.close();}
  else console.log("We're in !");
});
app.use(  bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname+"/HTML/register.html"));
});


app.get("/login", (req,res)=>{
  res.sendFile(path.join(__dirname+"/HTML/login.html"));
});

app.post("/login",(req,res)=>{
User.findOne({"login":req.body.login},(err,obj)=>{
  console.log(obj);
  if (err)
     res.send(err);
  if(obj.password == req.body.password)
     res.send({login:obj.login,password:obj.password,message:"You are logged in"});  // Well, this response  wouldn't be good idea if website had other data/functionality than logging in
  if(obj.password != req.body.password)
    res.send("Wrong password");
});

 res.send("No such user");
});

app.post("/",(req,res)=>{
  User.findOne({"login":req.body.login},(err,obj)=>{
    if (obj)
  res.send("User already exists");
 });
 const user = new User({
 _id : new mongoose.Types.ObjectId(),
 login: req.body.login,
 password: req.body.password,
});
user.save().then( ()=> res.sendFile(path.join(__dirname+"/HTML/login.html")))
.catch(error => {
  console.log(error)
});

});


app.listen(port,()=>console.log("Server started"));
