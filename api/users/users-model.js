const db = require('../../data/dbConfig')

const findBy=(filter)=>{
    return db('users')
    .where(filter)
    .first('users.user_id','users.username','users.password','users.phoneNumber')

}

const add=(user)=>{
    return db('users')
           .insert(user)
           .then(([id])=findBy(id))
}

const update=(user_id,updatedChanges)=>{
    return db('users')
    .where({user_id})
    .update({
        username:updatedChanges.username,
        password:updatedChanges.password,
        phoneNumber:updatedChanges.phoneNumber
    })
    .then(([id])=>findBy(id))
}

module.exports={
    update,
    findBy,
    add
}