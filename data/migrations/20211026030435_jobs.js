exports.up = function(knex) {
    return knex.schema.createTable('jobs', function (table) {
        table.increments('id').primary()
        table.string('title').notNullable()
        table.string('description').notNullable()
        table.specificType('image','text ARRAY').notNullable()
        table.decimal('salary').notNullable()
        table.string('time').notNullable()
        table.enu('type',['FULL','PART']).notNullable()
        table.integer('opening').notNullable()
        table.specificType('contacts','text ARRAY')
        table.specificType('location','integer ARRAY')
        table.string('submission_deadline').notNullable()
        table.integer('user_id').unsigned()
        table.foreign('user_id').references("users.id")
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('jobs')
};