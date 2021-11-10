exports.up = function(knex) {
    return knex.schema.createTable('partsBookings', function (table) {
        table.increments('id').primary()
        table.integer('sender_id').notNullable()
        table.integer('receiver_id').notNullable()
        table.integer('parts_id').notNullable()
        table.enu('status',['Order Received','Packed', 'Shipped','Delivered']).defaultTo("Order Received")
        table.foreign('sender_id').references("users.id")
        table.foreign('receiver_id').references("users.id")
        table.foreign('parts_id').references("parts.id")
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('partsBookings')
};