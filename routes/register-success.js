module.exports = app => {
  const pageDesctiption = {
    title: "Регистрация завершена",
    heading: "Регистрация завершена",
  }

  app.get("/register/success", (req, res) => {
    if (!req.session.user) return res.redirect("/login")
    res.render("register-success", pageDesctiption)
  })
}