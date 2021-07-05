module.exports = app => {
  const pageDesctiption = {
    title: "Все задачи",
    heading: "Все задачи",
  }

  app.get("/todos", (req, res) => {
    res.render("todos", pageDesctiption)
  })

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
}