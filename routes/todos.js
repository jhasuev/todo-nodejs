const Todo = require("../schemes/todo")

module.exports = app => {
  const pageDesctiption = {
    title: "Все задачи",
    heading: "Все задачи",
  }

  app.get("/todos", async (req, res) => {
    if (!req.session.user) return res.redirect("/login")
    
    const todos = await Todo.find({ uid: req.session.user })
    res.render("todos", { ...pageDesctiption, todos })
  })

  app.get("/todos/remove/:id", async (req, res) => {

    // если есть совпадение - удалит и возвратить, иначе - null
    await Todo.findOneAndRemove({
      _id: req.params.id,
      uid: req.session.user
    })
    
    res.redirect("/todos")
  })

  app.get("/todos/done/:id/:done", async (req, res) => {
    const done = Boolean(req.params.done * 1)

    await Todo.findOneAndUpdate({
      _id: req.params.id,
      uid: req.session.user
    }, {
      done,
    })

    res.redirect("/todos")
  })
}