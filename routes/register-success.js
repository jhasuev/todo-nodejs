module.exports = app => {
  const pageDesctiption = {
    title: "Регистрация завершена",
    heading: "Регистрация завершена",
  }

  app.get("/register/success", (req, res) => {
    res.render("register-success", pageDesctiption)
  })
}