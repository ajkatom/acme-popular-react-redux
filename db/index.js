const conn = require("./conn");
const { Sequelize } = conn;
const User = require("./users");

const dataToSeed = [
  { name: "moe", rating: "1" },
  { name: "larry", rating: "3" },
  { name: "curly", rating: "3" }
];

const syncSeed = () => {
  return User.sync({ force: true }).then(() => {
    return dataToSeed.map(user => {
      User.create(user);
    });
  });
};

module.exports = {
  syncSeed,
  model: {
    User
  }
};
