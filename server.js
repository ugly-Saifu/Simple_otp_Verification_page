const express = require("express")
const mongoose = require("mongoose")
const User = require("./model/User")
const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"gg205628@gmail.com",
        pass: process.env.pass ||"ecbn apco qqam eogi",
    }
})
mongoose.connect("mongodb://localhost:27017/Wayne_Tower").then(()=>{
    console.log("Connection to db succesfull");
}).catch(err=>{
    console.log(err);
})
const app = express();
app.set('view engine','hbs');
app.set('views','views')

app.use(express.urlencoded());
app.listen(3000,()=>{
    console.log("http://localhost:3000");
})
app.get('/',(req,res)=>{
    res.sendFile('public/home.html' , { root : __dirname});
})

app.get('/register',(req,res)=>{
    res.render("register");
})
var email;
var Otp;
app.post('/register',async (req,res)=>{
    const data = req.body;
    const newUser = new User(data);
    
    try{
        await newUser.save();
        email=newUser.email
        Otp=random();
        mail1()
        res.render("otp");
    }catch{
        res.send("i told u to take a shower");
    }
})

app.post('/verify',async (req,res)=>{
    const otp = req.body;
    const user = await User.findOne().where('email').equals(email);
    if(otp.otp==Otp)
    {

        user.verified=true;
        await user.save();
        res.send("here we go");
    }
    else   
        res.send("please Take a Shower");
})



function random() {
    var randomNumber = Math.floor(Math.random() * 9000) + 1000;
    console.log(randomNumber);
    return randomNumber;
}



function mail1(){
    const mail = {
        from:"gg205628@gmail.com",
        to:email,
        subject:'OTP Verification',
        text:`Your four digit Otp is ${Otp}`,
    }
    transporter.sendMail(mail);
}
