const Todo = require("../schemes/todo")

module.exports = app => {
  const pageDesctiption = {
    title: "Все задачи",
    heading: "Все задачи",
  }

  app.get("/todos", async (req, res) => {
    if (!req.session.user) return res.redirect("/login")
    
    const todos = await Todo.find({})
    console.log(todos)
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

  app.get("/todos/remove/:id", (req, res) => {
    const id = parseInt(req.params.id)

    if (Number.isInteger(id)) {
      res.send("removing: correct id...")
    } else {
      res.send("removing: incorrect id...")
    }
  })
  */
}