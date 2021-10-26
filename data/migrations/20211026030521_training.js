exports.up = function(knex) {
    return knex.schema.createTable('trainings', function (table) {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('time_period').notNullable()
        table.string('training_type').notNullable()
        table.integer('user_id').notNullable()
        table.foreign('user_id').references("users.user_id")
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('trainings')
};