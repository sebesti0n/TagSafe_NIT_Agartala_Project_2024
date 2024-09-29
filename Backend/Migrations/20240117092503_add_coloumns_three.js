/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('cameras',function(table){
      table.text('xAddress').defaultTo("");
      table.text('username').defaultTo("");
      table.text('password').defaultTo("");
  })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.alterTable('cameras', function(table){
      table.dropColumns(['xAddress','username','password']);
    });
  };
  