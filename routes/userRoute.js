const express = require("express")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken")
const {UserModel} = require("../models/usermodel")

const userRouter = express.Router()

// Register Users
userRouter.post("/register", async(req, res)=>{
    const {username, email, password} = req.body
    try {
        bcrypt.hash(password, 10, async(err, hash)=>{
            if(err){
                res.status(400).send({"msg":"Some thing went wrong while hashing"})
            } else{
                const user = new UserModel({username, email, password:hash})
                await user.save()
                res.status(200).send({"msg":"Registration Successful"})
            }
        })
    } catch (error) {
        res.status(400).send({"msg":"some thing went wrong while registering"})
    }
})

// Login User

userRouter.post("/login", async(req, res)=>{
    const {email, password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(result){
                    const token = jwt.sign({userID:user._id, user:user.username}, process.env.AccessKey)
                    res.status(200).send({"msg":"Login Successful", "token":token})
                } else{
                    res.status(400).send({"msg":"Incorrect password"})
                }
            })
        } else {
            res.status(400).send({"msg":"User Not Found"})
        }
    } catch (error) {
        res.status(400).send({"Error":error})
    }
})

module.exports = {userRouter}