exports.up = function(knex) {
    return knex.schema.table('parts', table => {
      table.string('description', 5000);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.table('parts', table => {
      table.dropColumn('description');
    })
  };