module.exports = (app) => {
  require("./index")(app)
  require("./login")(app)
  require("./todos")(app)
  require("./todos-create")(app)
  require("./register")(app)
  require("./register-success")(app)
}