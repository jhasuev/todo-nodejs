const Todo = require("../schemes/todo")
const getTimeFrom = hm => {
  const date = new Date(hm)
  const times = [
    date.getFullYear(),
    '.',
    date.getMonth() + 1,
    '.',
    date.getDate(),
    ' ',
    date.getHours(),
    ':',
    date.getMinutes(),
    ':',
    date.getSeconds(),
  ]
  return times.join('')
}

module.exports = app => {
  const pageDesctiption = {
    title: "Все задачи",
    heading: "Все задачи",
  }

  app.get(["/todos", "/todos/page", "/todos/page/:page"], async (req, res) => {
    if (!req.session.user) return res.redirect("/login")
    const WHERE = { uid: req.session.user }
    const page = Math.abs(Number(req.params.page) || 1)
    const count = await Todo.count( WHERE )
    const max = 5
    const skip = max * (page - 1)
    const pages = Math.ceil(count / max)
    const pagination = { page, pages }

    let todos = await Todo.find( WHERE ).sort({ created: -1 }).skip( skip ).limit( max )
    if (todos && todos.length) {
      todos = JSON.parse(JSON.stringify(todos))
      todos.forEach(todo => todo.created = getTimeFrom(todo.created))
  
      res.render("todos", { ...pageDesctiption, todos, pagination })
    } else {
      res.render("todos", { ...pageDesctiption, heading: "нет записей..." })
    }
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