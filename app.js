const express = require("express")
const app = express()

app.listen(8080)

app.get("/", (req, res) => {
  res.send("WORKS !!!")
})

console.log("server was started...");