const users = require("../service-users/users-data.json");
const todos = require("../service-todos/todos-data.json");

const allUsers = () => users;
const findUser = (id) => users.find((u) => u.id === id);
const totalUsers = () => users.length;

const allTodos = () => todos;
const findTodo = (id) => todos.filter((todo) => todo.id === id);

module.exports = { findUser, allUsers, totalUsers, allTodos, findTodo };
