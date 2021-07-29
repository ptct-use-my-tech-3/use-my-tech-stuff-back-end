const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET} = require('../secrets/index')
const {
       checkUsernameExists, 
       checkForMissingUsernameAndPassword,       
       checkUsernameFree
       } = require('../auth/auth-middleware')
const User = require('../users/users-model');




router.post('/register',checkUsernameFree,checkForMissingUsernameAndPassword,async(req,res,next)=>{
    try{
        let user = req.body    
        const rounds = parseInt(process.env.ROUNDS)        
        const hash = bcrypt.hashSync(user.password,rounds)        
    
        user.password = hash  
        const addedUser=await User.add(user)
        switch(user.role_name){
            case 'owner':
                const owner= await User.addOwner({owner_username:user.username}) 
               
                if(addedUser){
                    res.status(201).json(addedUser)
                }
                break;
            case 'renter':
                const renter= await User.addRenter({renter_username:user.username})
                
                if(addedUser){
                    res.status(201).json(addedUser)
                }
                break;
        }       
        
    }
    catch(err){
        res.status(500).json(`server error: ${err.message}`)
    }
      
})

router.post('/login',checkForMissingUsernameAndPassword,checkUsernameExists,(req,res,next)=>{
    let {username,password}=req.body
    User.findByUsername(username)
    .then(([user])=>{
        if(user && bcrypt.compareSync(password,user.password)){
            const token = makeToken(user)
            
            res.status(200)    
            .cookie('token',token)       
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
    user_id:user.user_id,
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