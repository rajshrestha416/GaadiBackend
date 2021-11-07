exports.up = function(knex) {
    return knex.schema.createTable('bookings', function (table) {
        table.increments('id').primary()
        table.integer('sender').notNullable()
        table.integer('receiver').notNullable()
        table.integer('vehicle_id').notNullable()
        table.enu('status',['Order Received','Packed', 'Shipped','Delivered']).defaultTo("Order Received")
        table.foreign('sender').references("users.id")
        table.foreign('receiver').references("users.id")
        table.foreign('vehicle_id').references("vehicles.id")
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('bookings')
};