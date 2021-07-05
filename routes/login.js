const User = require("../schemes/user")

module.exports = app => {
  const pageDesctiption = {
    title: "Войти на сайт",
    heading: "Войти",
  }

  app.get("/login", (req, res) => {
    if (req.session.user) return res.redirect("/")

    res.render("login", pageDesctiption)
  })

  app.post("/login", async (req, res) => {
    if (req.session.user) return res.redirect("/")
    
    const login = (req.body.login || "").trim()
    const password = (req.body.password || "").trim()
    const errors = {}
    let user = null

    if (login && password) {
      user = await User.findOne({ login })
      if (user) {
        if (user.password != password) {
          errors.password = "пароль неверный"
        }
      } else {
        errors.login = "такого пользователя нет"
      }
    } else {
      if (!login) errors.login = "заполните логин"
      if (!password) errors.password = "заполните пароль"
    }

    if (Object.keys(errors).length) {
      res.render("login", { ...pageDesctiption, errors, fields: { login, password } })
    } else {
      req.session.user = user._id
      res.redirect("/todos")
    }
  })
}