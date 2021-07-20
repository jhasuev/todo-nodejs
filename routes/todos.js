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

  /* 
  app.get("/todos/done/:id", (req, res) => {
    const id = parseInt(req.params.id)

    if (Number.isInteger(id)) {
      res.send("done: correct id...")
    } else {
      res.send("done: incorrect id...")
    }
  })

  */
  app.get("/todos/remove/:id", async (req, res) => {

    // если есть совпадение - удалит и возвратить, иначе - null
    await Todo.findOneAndRemove({
      _id: req.params.id,
      uid: req.session.user
    })
    
    res.redirect("/todos")
  })
}