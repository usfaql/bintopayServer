const userModel = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req,res)=>{
    const {firstName, lastName , email,password} = req.body;

    const user = new userModel({
        firstName, 
        lastName,
        email,
        password,
        role : "65baee39bdfe803083701ea1"
    });

    user.save().then((result)=> { 
        res.status(201).json({
            success : true,
            message : "Account Created Successfully",
            author : result
        });
    }).catch((err)=> {
        if(err.keyPattern){
            return res.status(409).json({
                success : false,
                message : "The email already exists"
            });
        }
        res.status(500).json({
            success : false,
            message : "Server Error",
            err : err.message
        });
    });
}

const login = (req,res)=>{
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    userModel.findOne({email}).populate("role").then(async (result)=>{
        if(!result){
            return res.status(403).json({
                success : false,
                message : `The email doesn't exist or The password you’ve entered is incorrect`
            });
        }
        try {
            const valid = await bcrypt.compare(password, result.password);
            if(!valid){
                return res.status(403).json({
                    success : false,
                    message : `The email doesn't exist or The password you’ve entered is incorrect`
                })
            }
            console.log(result);

            const payload = {
                userId : result._id,
                role : result.role
            }
        
            const options = {
                expiresIn : "2h"
            };

            const token = jwt.sign(payload, process.env.SECRET, options);

            res.status(200).json({
                success : true,
                message : `Valid login credentials`,
                token : token,
                userId : result._id
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }).catch((err)=>{
        res.status(500).json({
            success : false,
            message : `Server Error`,
            err : err.message
        });
    });
}

const getUserByAuthor = (req,res)=>{
    const userId =req.body.userId;

    userModel.find({_id: userId}).then((result)=>{
        res.status(201).json({
            success : true,
            message : `Data User By Author`,
            data : result
        })
    }).catch((err)=>{
        res.status(500).json({
            success : false,
            message : `Server Error`,
            err
        })
    })
}

module.exports = {
    register,
    login,
    getUserByAuthor
}
