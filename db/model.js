//if there is an index.js file at this path, it will use it by default.
//exporting STRING with db from other file so we don't need to require sequelize again
const { db, STRING } = require("./")

const Category = db.define("Category", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: { notNull: true, notEmpty: true },
  },
})

const Bookmark = db.define("Bookmark", {
  name: {
    type: STRING,
    allowNull: false,
    validate: { notNull: true, notEmpty: true },
  },
  url: {
    type: STRING,
    allowNull: false,
    validate: { notNull: true, notEmpty: true, isUrl: true },
  },
})

Category.hasMany(Bookmark)
Bookmark.belongsTo(Category)

async function dbModelSync() {
  await db.sync({ force: true })
  console.log("All models were synchronized successfully.")
}

module.exports = { db, Category, Bookmark }
