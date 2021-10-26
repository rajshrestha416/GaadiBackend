exports.up = function(knex) {
    return knex.schema.createTable('jobs', function (table) {
        table.increments('job_id').primary()
        table.string('job_name').notNullable()
        table.string('description').notNullable()
        table.integer('salary').notNullable()
        table.string('time').notNullable()
        table.string('submission_deadline').notNullable()
        table.integer('user_id').unsigned()
        table.foreign('user_id').references("users.user_id")
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('jobs')
};