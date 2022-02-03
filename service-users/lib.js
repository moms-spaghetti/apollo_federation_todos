const users = require("./users-data.json");

const allUsers = () => users;
const findUser = (id) => users.find((u) => u.id === id);

module.exports = { findUser, allUsers };
