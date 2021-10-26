
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('user_id').primary()
        table.string('firstname').notNullable()
        table.string('lastname').notNullable()
        table.string('contact').unique()
        table.string('email').unique()
        table.string('password').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};