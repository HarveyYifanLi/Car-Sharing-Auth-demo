// The middlewares are to go between request and a handler!

require('dotenv').config();
const jwt = require("jsonwebtoken");

//Authentication: make sure user is logged in
exports.loginRequired = function(req, res, next){
    try{
// Note the header's data will be "Authorization: Bearer WHOLE-TOKEN-HERE"        
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded){
                return next();// i.e. ensureCorrectUser();
            }else {
                return next({
                    status: 401, //failed authentication
                    message: "Please log in first!"
                });
            }
        });
    }catch(e){
        return next({status: 401, message: "Please log in first"});
    }
};
//Authorization: makre sure we get the correct user
exports.ensureCorrectUser = function(req, res, next){
    try{
    // Note the header's data will be "Authorization: Bearer WHOLE-TOKEN-HERE"        
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded && decoded.id === req.params.id){// make sure it's the correct user making request
            //by checking the id in the params equals the id in the verified token   
                return next();// e.g. createMessage()
            }else{
                return next({
                    status: 401,
                    message: "Unauthorized"
                });
            }
        });
    }catch(e){
        return next({
                    status: 401,
                    message: "Unauthorized"
        });
    }
};
