module.exports = {
  development: {
    client: 'pg',
    connection: {
      connectionString: 'postgresql://tagsafedb_user:R9RSQSNmvS64uiTy5MdhDDvzbJ4K7Gsr@dpg-crsje5ggph6c738ua6m0-a.oregon-postgres.render.com/tagsafedb',
      ssl: { rejectUnauthorized: false }, // Enable SSL for all environments
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../Migrations',
      client: 'pg',
    },
  },
};
