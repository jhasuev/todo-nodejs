const Todo = require("../schemes/todo")

module.exports = app => {
  const pageDesctiption = {
    title: "Создать задачу",
    heading: "Новая задача",
  }

  app.get("/todos/create", (req, res) => {
    if (!req.session.user) return res.redirect("/login")

    res.render("create", pageDesctiption)
  })

  app.post("/todos/create", async (req, res) => {
    if (!req.session.user) return res.redirect("/login")
    
    const title = req.body.title.trim()
    const text = req.body.text.trim()
    const uid = req.session.user
    const errors = {}

    if (!title) errors.title = "поле должно быть заполнено"

    if (Object.keys(errors).length) {
      res.render("create", { ...pageDesctiption, heading: "Ошибка...", errors, fields: { title, text } })
    } else {
      const todo = new Todo({ uid, title, text })
      await todo.save()
      res.redirect("/todos")
    }
  })
}