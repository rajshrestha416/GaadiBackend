// Update with your config settings.
require('dotenv').config()
module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: `${process.env.DB_CONN}`,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  // development: {
  //   client: 'pg',
  //   useNullAsDefault: true,
  //   connection: {
  //     host: process.env.POSTGRES_DEV_HOST,
  //     user: process.env.POSTGRES_DEV_USER,
  //     password: process.env.POSTGRES_DEV_PASSWORD,
  //     database: process.env.POSTGRES_DEV_DATABASE,
  //   },
  //   migrations: {
  //     directory: './database/migrations',
  //   },
  //   seeds: {
  //     directory: './database/seeds',
  //   },
  // },

  staging: {
    client: 'pg',
    connection: process.env.DB_CONN,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_CONN,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  }

};
