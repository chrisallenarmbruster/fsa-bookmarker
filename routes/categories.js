const router = require("express").Router()
const { db, Category, Bookmark } = require("../db/model.js")
const categoriesDetailView = require("../views/categoriesDetail.js")

router.get("/:id", async (req, res, next) => {
  try {
    const categoryBookmarks = await Category.findAll({
      attributes: ["name", "id"],
      include: [
        {
          model: Bookmark,
          attributes: ["id", "name", "url", "CategoryId"],
        },
      ],
      order: [[{ model: Bookmark }, "name", "ASC"]],
      where: { id: req.params.id },
    })
    res.status(200).send(categoriesDetailView(categoryBookmarks))
    // res.status(200).json(categoryBookmarks)
  } catch (error) {
    error.message =
      "GET categories/id route or related database queries failed."
    next(error)
  }
})

module.exports = router
