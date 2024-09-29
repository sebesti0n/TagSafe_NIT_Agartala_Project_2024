module.exports = {
  development: {
    client: 'pg',
    connection: {
      connectionString: process.env.POSTGRES_URL || 'postgres://admin:password@db:5432/mydatabase',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // SSL only in production
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../Migrations',
      client: 'pg',
    },
  },
};
