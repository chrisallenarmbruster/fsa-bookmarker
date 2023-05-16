const express = require("express")
const morgan = require("morgan")
const override = require("method-override")
const bookmarksRouter = require("./routes/bookmarks.js")
const categoriesRouter = require("./routes/categories.js")

const PORT = 1337
const app = express()

app.use(morgan("dev"))
app.use(express.json()) //for postman testing
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))
app.use(override("_method"))

app.use("/bookmarks", bookmarksRouter)

app.use("/categories", categoriesRouter)

app.get("/", (req, res) => {
  res.redirect("/bookmarks")
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send(err.message)
})

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
