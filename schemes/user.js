const db = require("../ext/db")

var UserSchema = new db.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

module.exports = db.model('User', UserSchema)
