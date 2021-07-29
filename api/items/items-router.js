const router = require('express').Router()
const Items = require('./items-model')

const { default: jwtDecode } = require('jwt-decode')

// All of these operations are what the owner can do
router.post('/',async(req,res,next)=>{
    try{       
       const decode = jwtDecode(req.headers.authorization) 
       
       const {name,description,cost,image,tags}= req.body

       const item = await Items.add({
        item_name:name,
        item_description:description,
        item_cost:cost,
        item_image:image,
        item_tags:tags,
        owner_username:decode.username
    })

    if(item){
        res.status(201).json(item)
    }

    }catch(err){
        res.status(500).json(`Server error: ${err.message}`)
    }
})

router.get('/',(req,res,next)=>{
    const decode = jwtDecode(req.headers.authorization)
    
    Items.find(decode.username)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`Server error: ${err.message}`)
    })
})

router.get('/:item_id',(req,res,next)=>{
    Items.findById(req.params.item_id)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`Server error: ${err.message}`)
    })
})

router.put('/:item_id',(req,res,next)=>{
    const {item_id} = req.params
    const updateItem= req.body
    
    Items.update(item_id,updateItem)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        
        res.status(500).json(`Server error: ${err.message}`)
    })
})


router.delete('/:item_id',(req,res,next)=>{
    const {item_id} = req.params
    Items.remove(item_id)
    .then(success=>{
       
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`Server error:${err.message}`)
    })
})

module.exports = router