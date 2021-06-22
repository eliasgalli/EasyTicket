const env = process.env;

const config = {
  db: { 
    connectionLimit: 5000,
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'root',
    database: env.DB_NAME || 'tickets',
    port: 3306
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;