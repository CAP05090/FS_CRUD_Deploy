const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

const auth = (req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        jwt.verify(token, process.env.AccessKey, (err, decoded)=>{
            if(err){
                req.send({"msg":"Wrong Token"})
            } else{
                req.body.userId = decoded.userID
                next()
            }
        })
    } else{
        res.send({"msg":"Token Expires, Please Login again"})
    }
}

module.exports = {auth}