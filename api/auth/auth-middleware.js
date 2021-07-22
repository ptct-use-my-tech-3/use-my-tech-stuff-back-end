const {JWT_SECRET} = require('../secrets/index')
const jwt = require('jsonwebtoken')
const User = require('../users/users-model')

const restricted=(req,res,next)=>{
    const token = req.headers.authorization

    if(!token){
        res.status(401).json("Token required")
    }
    else{
        jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if(err){
                res.status(401).json("Token invalid")
            }
            else{
                req.decodedToken = decoded
                next()
            }
        })
    }
}

const checkUsernameExists=(req,res,next)=>{
    User.findBy({username:req.body.username})
    .then(rows=>{
        if(rows.length){
            req.userData = rows[0]
            next()
        }
        else{
            res.status(401).json("Invalid credentials")
        }
    })
    .catch(err =>{
        res.status(500).json(`Server error: ${err.message}`)
    })
}

const checkUsernameFree=(req,res,next)=>{
    User.findBy({username:req.body.username})
    .then(rows=>{
        if(!rows.length){
            next()
        }
        else{
            res.status(401).json("Username is already taken")
        }
    })
    .catch(err=>{
        res.status(500).json(`Server error: ${err.message}`)
    })
   
}

const checkForMissingUsernameAndPassword=(req,res,next)=>{
    const {username,password}=req.body
    if(!username || username==="" || 
       !password || password ===""){
           next({status:400,message:"username and password are required"})

    }
    else{
        next()
    }
}


module.exports={
    checkUsernameExists,
    checkUsernameFree,
    checkForMissingUsernameAndPassword,
    restricted
}