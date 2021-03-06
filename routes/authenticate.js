var express = require('express')

const mongoose = require("mongoose");
const bodyParser=require("body-parser");
var nodemailer = require('nodemailer');
var crypto = require("crypto");

var ObjectId = require('mongoose').Types.ObjectId; 
const Bcrypt = require("bcryptjs");
let jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

let config = require('./config');
let middleware = require('./jwtverification');
var router = express.Router()
var port = process.env.PORT || 8080



mongoose.connect('mongodb://heroku_wr9z45km:4qlbddem2aer4k5djhcrp5ph3s@ds243717.mlab.com:43717/heroku_wr9z45km', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

function send_mail(from, receiver, subject, message){
    var mailer = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'foodoholics4@gmail.com',
            pass: 'deliciousfood'
        }
    })
    var mailOptions = {
        from: 'foodoholics4@gmail.com',
        to: receiver,
        subject: subject,
        text: message
    }
    mailer.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        }
        else{
            console.log('Email sent: ' +  info.response)
        }
    })
}

router.post("/recover/:collection_name", function(req, res){
    var collection_name = req.params.collection_name;
    var email = req.body.email
    if(collection_name == 'user'){
        collection_name = 'user_data';
    }
    else if(collection_name == 'restaurant'){
        collection_name = 'restaurant_data'
    }
    else if(collection_name=='delivery'){
        collection_name='delivery_data'
    }
    else{
        res.status(404).error("Page Not Found");
        return;
    }
    random_password = crypto.randomBytes(20).toString('hex');
    data_update = {
        $set: {
            password: Bcrypt.hashSync(random_password, 10)
        }
    }
    db.collection(collection_name).updateOne({email: email}, data_update, function(err, data){
        if (err){
            console.log(err)
        }
        else{
            email_text = "You new password is " + random_password
            send_mail('foodoholics4@gmail.com', email, "Food-o-Holic New Password", email_text)

            res.json({
                "message": "Password resetted and sent via email"
            })
        }
    })

})

router.post('/login/:collection_name', function(req, res){
    // const pass = Bcrypt.hashSync(req.body.password, 10)
    // console.log(pass)
    var collection_name = req.params.collection_name;
    if(collection_name == 'user'){
        collection_name = 'user_data';
    }
    else if(collection_name == 'restaurant'){
        collection_name = 'restaurant_data'
    }
    else if(collection_name=='delivery'){
        collection_name='delivery_data'
    }
    else{
        res.status(404).error("Page Not Found");
        return;
    }
    db.collection(collection_name).findOne({email: req.body.email}, {projection:{ name: 1, password: 1}}, function(err, data){
        if (err || data == null){
            // console("Inside null condition")
            // res.send("User does not exist");
            res.cookie("auth", 'negative')
            res.json({auth: false})
            return
        }
        else{
            // db.collection(collection_name).findOne({email: req.body.email}, {projection:{ name: 1, password: 1, email: 1}}, function(err, data){
            if(Bcrypt.compareSync(req.body.password, data.password)){
                // console.log("Inside verifieed")
                // console.log(data)
                // res.send("authenticated")
                let token = jwt.sign({_id: data._id}, config.secret, {expiresIn: '168h'});
                const otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
                const otp_data = {
                    $set: {
                        otp: otp
                    }
                }
                db.collection(collection_name).findOneAndUpdate({_id: data._id}, otp_data, {projection:{ email: 1}}, function(err, d){
                    if (err){
                        res.status(404).send("Page Not Found");
                    }
                    else{
                        
                        // var receiver = req.body.email
                        var email_text = "Your One Time Password is " + otp;
                        console.log(d.value.email)
                        send_mail('foodoholics4@gmail.com', d.value.email, "Food-o-Holic OTP Verification", email_text)
                        
                    }
                })
                var options = {maxAge: 604800000, httpOnly:true, secure:true}
                // res.cookie("jwttoken", "raj");
                // res.cookie("autht", token)
                console.log(data._id)
                res.json({
                    auth: true,
                    message: 'Auth Successful',
                    _id: data._id,
                    name: data.name,
                    token: token

                });
                return
            }
            else{
                console.log("Auth Failed")
                res.cookie("autht", 'negative')
                res.json({
                    auth: false,
                    message: 'Incorrect username or password'
                });
                return
            }  
            // });
        }
    });
})

router.get('/verify/:email/:token/:collection_name', function(req, res){

    // console.log(req.body)
    var collection_name = req.params.collection_name;
    if(collection_name == 'user'){
        collection_name = "user_data"
    }
    else if(collection_name == 'restaurant'){
        collection_name = "restaurant_data"
    }
    else if(collection_name=='delivery'){
        collection_name="delivery_data"
    }
    else{
        // res.redirect('*')
        res.status(404).send("Page Not Found");
        return;
    }


    const new_vals = {
        $set: {
            is_verified: true
        }
    }
    db.collection('user_data').findOneAndUpdate({email: req.params.email, token: parseInt(req.params.token)}, new_vals, function(err, data){
        if(err){
            console.log(err);
            res.json({message: "Invalid URL"});
        }
        else{
            console.log(data);
            res.json({message:"Hii! You're verified"});
        }
    })    
});

// Continue working here
router.post('/verifyotp/:collection_name', function(req, res){
    var collection_name = req.params.collection_name;
    console.log("in the function")
    if(collection_name == 'user'){
        collection_name = "user_data"
    }
    else if(collection_name == 'restaurant'){
        collection_name = "restaurant_data"
    }
    else if(collection_name=='delivery'){
        collection_name='delivery_data'
    }
    else{
        res.status(404).send("Page Not Found");
        return;
    }
    var otp = req.body.otp
    db.collection(collection_name).findOne({_id: new ObjectId(req.body._id)}, function(err, data){
        if(err){
            res.send({auth: "false"})
        }
        else{
            if (data['otp'] == otp){
                let token = jwt.sign({_id: data._id}, config.secret, {expiresIn: '168h'});
                res.send({
                    auth: "true",
                    jwttoken: token
                })  
            }
            else{
                res.json({
                    auth: "false"
                })
            }
            
            
        }
        console.log(data)
    });
});

 

router.post('/sign_up/:collection_name', function(req, res){
    console.log(req.body)
    var collection_name = req.params.collection_name;
    if(collection_name == 'user'){
        collection_name = 'user_data';
        var token = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
        var data_to_be_inserted = {
            "name": req.body.name,
            "email": req.body.email,
            "password": Bcrypt.hashSync(req.body.password, 10),
            "token": token,
            "is_verified": false,
            otp: 0
        }
    }
    else if(collection_name == 'restaurant'){
        collection_name = "restaurant_data";
        var token = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
        var data_to_be_inserted = {
            "manager_name": req.body.name,
            "email": req.body.email,
            "password": Bcrypt.hashSync(req.body.password, 10),
            "token": token,
            "is_verified": false,
            "name": req.body.restaurant_name,
            "ratings": 0,
            "num_ratings": 0
        }
    }

    else if(collection_name == 'delivery'){
        collection_name = "delivery_data";
        var token = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
        var data_to_be_inserted = {
            "name": req.body.name,
            "email": req.body.email,
            "password": Bcrypt.hashSync(req.body.password, 10),
            "token": token,
            "is_verified": false,
            
        }
    }
    else{
        res.status(404).send("Page Not Found");
    }
    db.collection(collection_name).findOne({email: req.body.email}, {projection:{ email: 1}}, function(err, data){
        if (err || data == null){
            
            console.log(Bcrypt.hashSync(req.body.password, 10))
            db.collection(collection_name).insertOne(data_to_be_inserted, function (error, result){
                if (error){
                    console.log("error here")
                    throw error;
                    
                }
                console.log("User Signed up successfully")
            });

            var receiver = req.body.email
            var email_text = "Click on the link to verify your account " + "https://foodoholic-backend.herokuapp.com/authentication/verify/" + req.body.email + '/' + token + '/'+req.params.collection_name;
            send_mail('foodoholics4@gmail.com', receiver, "Food-o-Holic User Verification", email_text)
            res.json({message: "User Registered and a verification email has been sent"})
        }
        else{
            res.json({message: data.email + " already exists"})
        }
        
    });
    

});



module.exports = router
