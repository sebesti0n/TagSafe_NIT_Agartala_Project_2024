/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('cameras',function(table){
        table.increments('cam_id').primary();
        table.integer('owner_id').references('user_id').inTable('users').notNullable();
        table.text('resolution').defaultTo(null);
        table.text('longitude').defaultTo(null);
        table.text('latitude').defaultTo(null);
        table.text('RTSP_Link').defaultTo(null);
        table.text('pov_direction').defaultTo(null);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('cameras');
};
