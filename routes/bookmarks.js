const router = require("express").Router()
const { db, Category, Bookmark } = require("../db/model.js")
const bookmarksList = require("../views/bookmarksList.js")

router.get("/", async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.findAll({
      attributes: ["name", "url"],
      include: [{ model: Category, attributes: ["id", "name"] }],
      order: [["name", "ASC"]],
    })

    //this is for the category dropdown input
    const categories = await Category.findAll({
      attributes: ["id", "name"],
      order: [["name", "ASC"]],
    })

    res.status(200).send(bookmarksList(bookmarks, categories))
  } catch (error) {
    error.message = "GET bookmarks route or related database queries failed."
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    //this checks if the bookmark name is already in use and
    //if it is, it updates it rather than creating another by the same name
    const nameAlreadyUsed = await Bookmark.findOne({
      where: { name: req.body.name },
    })
    if (!nameAlreadyUsed) {
      const newBookmark = await Bookmark.create(req.body)
      res.status(201).redirect(`/categories/${newBookmark.CategoryId}`)
    } else {
      const updatedBookmark = await Bookmark.update(req.body, {
        where: { name: req.body.name },
        returning: true,
      })
      res
        .status(201)
        .redirect(`/categories/${updatedBookmark[1][0].CategoryId}`)
    }
  } catch (error) {
    error.message = "POST bookmarks route or related database queries failed."
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findByPk(req.params.id)
    const categoryId = bookmark.CategoryId
    await bookmark.destroy()
    res.redirect(`/categories/${categoryId}`)
  } catch (error) {
    error.message =
      "DELETE bookmarks/id route or related database queries failed."
    next(error)
  }
})

module.exports = router
