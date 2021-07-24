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
           .select('name','description','cost','image','tags')
           .orderBy('item_id')
}

// Find a specific item
const findBy=(filter)=>{
    return db ('items')
           .where(filter)
           .first('name','description','cost','image','tags')
           
}

const update=(item_id,updatedItem)=>{
    return db('items')
           .where({item_id:item_id})
           .update({
               name:updatedItem.name,
               description:updatedItem.description,
               cost:updatedItem.cost,
               image:updatedItem.image,
               tags:updatedItem.tages
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