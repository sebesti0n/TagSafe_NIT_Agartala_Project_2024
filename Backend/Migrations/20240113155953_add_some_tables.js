/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('users',function(table){
    table.text('addressLine1').defaultTo("");
    table.text('city').defaultTo("");
    table.text('state').defaultTo("");
    table.text('phoneNumber').defaultTo("");
    table.text('aadharNumber').defaultTo("");
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('users', function(table){
    table.dropColumns(['addressLine1','city','state','phoneNumber','aadharNumber']);
  });
};
