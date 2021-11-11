exports.up = function(knex) {
<<<<<<< HEAD
    return knex.schema.table('vehicles', table => {
      table.string('description', 5000);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.table('vehicles', table => {
      table.dropColumn('description');
    })
  };
  
=======
    // return knex.schema.table('vehicles', table => {
    //   table.string('description');
    // })
  };
  
  exports.down = function(knex) {
    // return knex.schema.table('vehicles', table => {
    //   table.dropColumn('description');
    // })
  };
>>>>>>> 3717371d1cdde8860cd0460da2a457afe7d86232
