const User = require("../schemes/user")

module.exports = app => {
  const pageDesctiption = {
    title: "Войти на сайт",
    heading: "Войти",
  }

  app.get("/login", (req, res) => {
    res.render("login", pageDesctiption)
  })

  app.post("/login", (req, res) => {
    res.render("login", {
      ...pageDesctiption,
      errors: {
        login: "не правильный логин",
        password: "не правильный пароль..."
      }
    })
  })
}