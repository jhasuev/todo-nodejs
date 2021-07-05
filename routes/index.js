module.exports = app => {
  app.get("/", (req, res) => {
    if (req.session.user) res.redirect("/todos")
    else res.redirect("/login")
  })
}