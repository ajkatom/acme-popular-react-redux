const Sequelize = require("sequelize");

const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/popular_acme_users_db",
  { logging: false }
);

module.exports = conn;
