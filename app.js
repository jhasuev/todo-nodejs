const express = require("express")
const app = express()
const routes = require("./routes/main")
const path = require("path")

app.listen(8080)
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs")
app.engine("ejs", require("ejs-locals"))

routes(app)

console.log("server was started...");