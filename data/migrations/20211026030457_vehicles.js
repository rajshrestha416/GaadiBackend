exports.up = function(knex) {
    return knex.schema.createTable('vehicles', function (table) {
        table.increments('id').primary()
        table.string('title').notNullable()
        table.specificType('image','text ARRAY').notNullable()
        table.string('make').notNullable()
        table.string('model').notNullable()
        table.integer('price').notNullable()
        table.string('color').notNullable()
        table.specificType('features','text ARRAY')
        table.specificType('contacts','text ARRAY').notNullable()
        table.specificType('location','integer ARRAY').notNullable()
        table.integer('user_id').notNullable()
        table.foreign('user_id').references("users.id")
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('vehicles')
};