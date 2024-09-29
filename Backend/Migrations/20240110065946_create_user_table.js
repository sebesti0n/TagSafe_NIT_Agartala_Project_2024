/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    console.log('Creating users table...');
    return knex.schema.createTable('users', function (table) {
        table.increments('user_id').primary();
        table.string('Name', 50).unique().notNullable();
        table.string('Email', 100).unique().notNullable();
        table.string('Password', 100).notNullable();
        table.string('ConfirmPassword', 100).notNullable();

      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
