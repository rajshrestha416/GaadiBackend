exports.up = function(knex) {
    return knex.schema.createTable('events', function (table) {
        table.increments('event_id').primary()
        table.string('event_name').notNullable()
        table.string('event_date').notNullable()
        table.string('location').notNullable()
        table.integer('user_id').notNullable()
        table.foreign('user_id').references("users.user_id")
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('events')
};