const User = require("../schemes/user")

module.exports = app => {
  const pageDesctiption = {
    title: "Зарегистрироваться на сайт",
    heading: "Зарегистрироваться",
  }

  app.get("/register", (req, res) => {
    res.render("register", pageDesctiption)
  })

  app.post("/register", async (req, res) => {
    const login = req.body.login.trim()
    const password = req.body.password.trim()
    const passwordConfirm = req.body.passwordConfirm.trim()

    const errors = {}

    if (!login) {
      errors.login = "логин не может быть пустым"
    } else {
      const hasUser = await User.findOne({ login })
      if (hasUser) {
        errors.login = "логин занят"
      }
    }

    if(!password) {
      errors.password = "пароль не может быть пустым"
    } else {
      if (password != passwordConfirm) {
        errors.passwordConfirm = "пароль должы совподать"
      }
    }

    // если есть ошибки...
    if (Object.keys(errors).length) {
      res.render("register", {
        ...pageDesctiption,
        errors,
        heading: "Has errors...",
        fields: { login, password, passwordConfirm }
      })
    } else {
      const user = new User({ login, password })
      await user.save()
      req.session.user = user._id
      res.redirect("/register/success")
    }
  })
}