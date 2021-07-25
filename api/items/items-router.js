const router = require('express').Router()
const Items = require('./items-model')


router.post('/',(req,res,next)=>{
    const {user_id} = req.token
    const {name,description,cost,image,tags}= req.body

    Items.add({
        item_name:name,
        item_description:description,
        item_cost:cost,
        item_image:image,
        item_tags:tags,
        item_user_id:user_id
    })
    .then(success=>{
        res.status(201).json(success)
    })
    .catch(err=>next(err))
})

router.get('/',(req,res,next)=>{
    const {user_id} = req.token
    Items.find(user_id)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>next(err))
})

router.get('/:item_id',(req,res,next)=>{
    Items.findBy({item_id:req.params.id})
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>next(err))
})

router.put('/:item_id',(req,res,next)=>{
    const {item_id} = req.params
    const {name,description,cost,image,tags}= req.body

    Items.update(item_id,{
        item_name:name,
        item_description:description,
        item_cost:cost,
        item_image:image,
        item_tags:tags
    })
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>next(err))
})


router.delete('/:item_id',(req,res,next)=>{
    const {item_id} = req.params
    Items.remove(item_id)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>next(err))
})

module.exports = router