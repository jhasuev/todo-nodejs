const db = require("../ext/db")

var TodoSchema = new db.Schema({
  uid: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String },
  created: { type: Date, default: Date.now },
  done: { type: Boolean, required: true, default: false },
})

module.exports = db.model('Todo', TodoSchema)
