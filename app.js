const express = require("express")
const app = express()
const routes = require("./routes/main")
const path = require("path")
const cookieParser = require("cookie-parser")
const session = require('express-session')

app.listen(8080)
app.use(express.urlencoded({ extended: false }))
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs")
app.engine("ejs", require("ejs-locals"))
app.use(cookieParser())
app.use(session({
  secret: "MySecretWord",
}))

routes(app)

console.log("server was started...");