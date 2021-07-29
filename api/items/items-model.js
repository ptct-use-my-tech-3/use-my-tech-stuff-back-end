const db = require('../data/dbConfig')

// These database access functions are associated with what the owner can do when accessing the database.

function add (item){
    return db('items')
           .returning(['item_id','item_name','item_description','item_cost','item_image','item_tags'])
           .insert(item)
           
}

// Get all of the items associated with a specific id
const find=(owner_username)=>{
    return db('items')
           .where("owner_username",owner_username)
           .select('item_id','item_name','item_description','item_cost','item_image','item_tags','isRented','renter_username')
           .orderBy('item_id')
}

// Find a specific item -- Use for Owner and Renter
function findById(item_id){
    
    return db ('items')
           .where('item_id',item_id)
           .first('item_id','item_name','item_description','item_cost','item_image','item_tags','isRented','renter_username','owner_username')
           
}

// Update an item
function update(item_id,updatedItem){
    
    return db('items')           
           .update({
               item_name:updatedItem.name,
               item_description:updatedItem.description,
               item_cost:updatedItem.cost,
               item_image:updatedItem.image,
               item_tags:updatedItem.tags,
               isRented:updatedItem.isRented,               
               renter_username:updatedItem.renter_username
           })
           .where('item_id',item_id)
           .returning(['item_id','item_name','item_description','item_cost','item_image','item_tags','isRented','renter_username'])
}

// Delete an item
const remove=(item_id)=>{   

    return db('items')
           .where({item_id:item_id})
           .returning(['item_id','item_name','item_description','item_cost','item_image','item_tags'])
           .del()
           
}

// All of these functions are associated with what the renter can do.

// Retrieve all items available for rent
function available(){
    return db('items')
           .where("isRented",0)
           .select('item_id','item_name','item_description','item_cost','item_image','item_tags','isRented','owner_username')
           .orderBy('item_id')
}

// Retrieve all items rented by the user
function rented(username){
    return db('items')
           .where('renter_username',username)
           .select('item_id','item_name','item_description','item_cost','item_image','item_tags','isRented','owner_username')
           .orderBy('item_id')
}


// Allow the renter to rent an item
function rentItem(item_id,username,rented){
    console.log(rented)
    return db('items')           
           .update({
               isRented:rented,
               renter_username:username              
           })
           .where('item_id',item_id)
           .returning(['item_id','item_name','item_description','item_cost','item_image','item_tags','isRented','renter_username','owner_username'])

}


module.exports ={
    add,
    findById,
    update,
    remove,
    find,
    available,
    rented,
    rentItem
}