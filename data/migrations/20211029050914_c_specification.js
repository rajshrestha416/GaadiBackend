exports.up = function(knex) {
    return knex.schema.createTable('c_specifications', function (table) {
        table.increments('id').primary()
        table.string('title').notNullable()
        table.specificType('specs','text ARRAY').notNullable()
        table.integer('vehicle_id').notNullable()
        table.foreign('vehicle_id').references("vehicles.id")
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('c_specifications')
};