const db = require('../../data/dbConfig')

const findBy=(filter)=>{
    return db('users')
    .where(filter)
    .first('user_id','username','password')

}

const add=(user)=>{
    return db('users')
           .insert(user)
           .then(([id])=findBy(id))
}

// TODO: update this function to include update to role type: user is owner or renter
const update=(user_id,updatedChanges)=>{
    return db('users')
    .where({user_id})
    .update({
        username:updatedChanges.username,
        password:updatedChanges.password,
        role_type:updatedChanges.role_type        
    })
    .then(([id])=>findBy(id))
}

module.exports={
    update,
    findBy,
    add
}