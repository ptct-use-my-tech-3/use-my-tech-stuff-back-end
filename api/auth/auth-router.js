const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET} = require('../secrets/index')
const {
       checkUsernameExists, 
       checkForMissingUsernameAndPassword,       
       checkUsernameFree
       } = require('../auth/auth-middleware')
const User = require('../users/users-model')


router.post('/register',checkUsernameFree,checkForMissingUsernameAndPassword,(req,res,next)=>{
    let user = req.body

    const rounds = process.env.ROUNDS || 8
    const hash = bcrypt.hashSync(user.password,rounds)

    user.password = hash

    User.add(user)
    .then(success=>{
        res.status(201).json(success)
    })
    .catch(err =>{
        next(err)
    })
})

router.post('/login',checkForMissingUsernameAndPassword,checkUsernameExists,(req,res,next)=>{
    let {username,password}=req.body
    User.findBy(username)
    .then(([user])=>{
        if(user && bcrypt.compare(password,user.password)){
            const token = makeToken(user)
            res.status(200)
            .cookie("token",token)
            .json({
                message: `Welcome back ${user.username}`,
                token
            })
        }
        else{
            res.status(401).json("Invalid credentials")
        }
    })
    .catch(err =>{
        next(err)
    })
})


const makeToken=(user)=>{
    const payload={
    id:user.user_id,
    username:user.username,
    password:user.password,
    role_name:user.role_name
    }

    const option={
        expiresIn: "1d"

    }
    return jwt.sign(payload,JWT_SECRET,option)
}

module.exports = router