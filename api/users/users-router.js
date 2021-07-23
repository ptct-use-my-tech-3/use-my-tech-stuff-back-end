const router = require('express').Router()
const Users = require('./users-model')
const bcrypt = require('bcryptjs')


router.put('/:user_id',(req,res,next)=>{
    const user_id = req.params.user_id
    const {password} = req.body.password

    const rounds = process.env.ROUNDS || 8
    const hash = bcrypt.hashSync(user.password,rounds)
    password = hash

    Users.update(user_id,password)
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(err=>next(err))
})