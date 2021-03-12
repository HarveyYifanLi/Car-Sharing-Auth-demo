const db = require("../models")// automatically default to require('../models/index'), thus will be able to access db data models e.g. db.User.create(req.body)
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next){
    try {
        let user = await db.User.findOne({email: req.body.email});
        let {id, username, profileImageUrl} = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            });
        }
    } catch(err){
        return next({
                status: 400,
                message: "Invalid Email/Password."
        });
    }
};

exports.signup = async function(req, res, next){
    try{
        let user = await db.User.create(req.body); // req will be coming from the client's ajax request
        let {id, username, profileImageUrl} = user; // use destructing syntax to create vars
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY); // first arg should be the payload, second should be the secret key
        
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        }); // send back to client the successful res object with token!
    } catch(err){
        // if a validation fails! (note the error code!), provide a customized error message 
        if(err.code === 11000){
            err.message = "Sorry, that username and/or email is taken!";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
};
