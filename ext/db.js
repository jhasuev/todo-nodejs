const db = require("mongoose")
db.connect("mongodb://localhost/todo-js-db")
module.exports = db