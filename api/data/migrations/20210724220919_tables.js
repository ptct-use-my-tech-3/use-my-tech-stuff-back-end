
exports.up = function(knex) {
    return knex.schema
      .createTable('roles',roles =>{
          roles.increments('role_id')
          roles.string('role_name',32).notNullable().unique()
      })
      .createTable('users',users=>{
          users.increments('user_id')
          users.string('username',128).notNullable().unique()
          users.string('password',128).notNullable()
          users.integer('role_id')
             .unsigned()
             .references('role_id')
             .inTable('roles')
             .onUpdate('CASCADE')
             .onDelete('CASCADE')
          users.integer('item_id')
             .unsigned()
             .references('item_id')
             .inTable('items')
             .onUpdate('CASCADE')
             .onDelete('CASCADE')
      })
      .createTable('items',items=>{
          items.increments('item_id')
          items.string('item_name',128).notNullable().unique()
          items.string('item_description',200)
          items.decimal('item_cost',2).notNullable()
          items.string('item_image')
          items.string('item_tags')          
      })


  
};

exports.down = function(knex) {
     return knex.schema
         .dropTableIfExists('items')
         .dropTableIfExists('users')
         .dropTableIfExists('roles')
};
