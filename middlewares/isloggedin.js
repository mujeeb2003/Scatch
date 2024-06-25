const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model.js");

module.exports.isLoggedIn = async function(req,res,next){
    if(!req.cookies.token){
        req.flash("error","Please login first");
        return res.redirect("/");
    }

    try{
        const token = req.cookies.token;
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        const user = await userModel.findOne({email:decoded.email}).select("-password");

        req.user = user;

        next();

    }catch(err){
        req.flash("error","Error detected");
        return res.redirect("/");
    }
}