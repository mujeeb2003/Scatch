const userModel = require("../models/user-model.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken.js")

module.exports.registerUser = async function(req,res){

    const {fullname, email, password} = req.body;
    
    try{
        let user = await userModel.findOne({email:email});
        if(user){
            req.flash("error", "You already have an account, please login.");
            return res.redirect("/");
        }
        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(password ,salt , async function(err,hash){
                if(err) return res.send(err.message);

                const newUser = await userModel.create({
                    fullname,
                    password:hash,
                    email
                });
                
                let token = generateToken(newUser);
                res.cookie("token", token);

                res.redirect("/shop");
            })
        })        
        
    }
    catch(err){
        res.send(err.message);
    }
}

module.exports.loginUser = async function(req,res){
    const {email,password}  = req.body;

    try{

        let user = await userModel.findOne({email:email});
        if(!user) {
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/");
        }
        bcrypt.compare(password,user.password,function(err,result){
            if(err) return res.send(err.message);

            if(result){
                let token = generateToken(user);
                res.cookie("token", token);

                res.status(200).redirect("/shop");
            }
            else {
                req.flash("error", "Email or Password incorrect");
                return res.redirect("/");
            }
        })
    } catch(err){
        res.status(401).send(err.message);
    }
}

module.exports.logoutUser = function(req, res){
    res.cookie("token","");
    res.redirect("/");
}