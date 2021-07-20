const Todo = require("../schemes/todo")

module.exports = app => {
  const pageDesctiption = {
    title: "Изменить задачу",
    heading: "Изменить задачу",
  }

  app.get("/todos/edit/:_id", async (req, res) => {
    if (!req.session.user) return res.redirect("/login")
    const { _id } = req.params
    
    const todo = await Todo.findOne({ _id })
    if (!todo) return res.redirect("/todos")
    
    res.render("edit", { ...pageDesctiption, fields: todo })
  })
  
  app.post("/todos/edit/:_id", async (req, res) => {
    if (!req.session.user) return res.redirect("/login")
    
    const { _id } = req.params
    const title = req.body.title.trim()
    const text = req.body.text.trim()
    const uid = req.session.user
    const errors = {}

    if (!title) errors.title = "поле должно быть заполнено"

    if (Object.keys(errors).length) {
      res.render("edit", { ...pageDesctiption, heading: "Ошибка...", errors, fields: { title, text } })
    } else {
      await Todo.findOneAndUpdate({ _id, uid }, { title, text })
      res.redirect("/todos")
    }
  })
}