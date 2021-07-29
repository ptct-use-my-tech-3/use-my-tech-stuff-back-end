const router = require('express').Router()
const Items = require('../items/items-model')
const { default: jwtDecode } = require('jwt-decode')

// All operations here are what a renter can do

// retrieve all items that are available for rent
router.get('/available',(req,res,next)=>{
    Items.available()
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`Server error: ${err.message}`)
    })
})

//Retrieve all items that have been rented by the user
router.get('/rented',(req,res,next)=>{
    const decode = jwtDecode(req.headers.authorization)
    Items.rented(decode.username)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`Server error: ${err.message}`)
    })
})

// Retrieve a specific item that the user has rented
router.get('/rented/:item_id',(req,res,next)=>{
    Items.findById(req.params.item_id)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`Server error: ${err.message}`)
    })
})

// Allows the renter to rent an item
router.put('/available/:item_id',(req,res,next)=>{
    const {item_id} = req.params
    const decode = jwtDecode(req.headers.authorization)
    const rented= req.body.isRented
    
    Items.rentItem(item_id,decode.username,rented)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
       
        res.status(500).json(`Server error: ${err.message}`)
    })
})


module.exports = router