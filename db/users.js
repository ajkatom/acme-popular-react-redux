const conn = require("./conn");
const { Sequelize } = conn;

const User = conn.define("user", {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  rating: Sequelize.STRING
});

module.exports = User;
