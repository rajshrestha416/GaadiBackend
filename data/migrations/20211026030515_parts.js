exports.up = function(knex) {
    return knex.schema.createTable('parts', function (table) {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('price').notNullable()
        table.string('make').notNullable()
        table.string('model').notNullable()
        table.integer('user_id').notNullable()
        table.foreign('user_id').references("users.user_id")
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('parts')
};