exports.up = function(knex) {
    return knex.schema.table('vehicles', table => {
      table.string('description', 5000);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.table('vehicles', table => {
      table.dropColumn('description');
    })
  };
