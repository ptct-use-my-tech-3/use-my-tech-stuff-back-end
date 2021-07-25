const db = require('../../data/dbConfig')

const add = (item)=>{
    return db('items')
           .insert(item)
           .then(([id])=> findBy(id))
}

// Get all of the items associated with a specific id
const find=(user_id)=>{
    return db('items')
           .where(user_id)
           .select('item_name','item_description','item_cost','item_image','item_tags')
           .orderBy('item_id')
}

// Find a specific item
const findBy=(filter)=>{
    return db ('items')
           .where(filter)
           .first('item_name','item_description','item_cost','item_image','item_tags')
           
}

const update=(item_id,updatedItem)=>{
    return db('items')
           .where({item_id:item_id})
           .update({
               item_name:updatedItem.name,
               item_description:updatedItem.description,
               item_cost:updatedItem.cost,
               item_image:updatedItem.image,
               item_tags:updatedItem.tags
           })
           .then(([id])=>findBy(id))
}

const remove=(item_id)=>{
    const itemToDelete = findBy(item_id)

    return db('items')
           .where({item_id:item_id})
           .del()
           .then(()=>{
               return itemToDelete
           })           
}

module.exports ={
    add,
    findBy,
    update,
    remove,
    find
}