const { db, Category, Bookmark } = require("./model.js")

const categories = [
  { name: "coding" },
  { name: "search" },
  { name: "jobs" },
  { name: "gaming" },
  { name: "news" },
  { name: "finances" },
  { name: "media" },
  { name: "shopping" },
  { name: "other" },
]

const bookmarks = [
  { name: "Google", url: "https://www.google.com/", category: "search" },
  {
    name: "Stack Overflow",
    url: "https://stackoverflow.com/",
    category: "coding",
  },
  { name: "Bing", url: "https://www.bing.com/", category: "search" },
  { name: "LinkedIn", url: "https://www.linkedin.com/", category: "jobs" },
  { name: "Indeed", url: "https://www.indeed.com/", category: "jobs" },
  {
    name: "MDN",
    url: "https://developer.mozilla.org/en-US/",
    category: "coding",
  },
]

async function seed() {
  try {
    await db.sync({ force: true })
    console.log("starting seed process")

    //this map will return an array of promises which is what Promise.all wants
    //it creates the records in parallel vs. sequentially
    await Promise.all(
      categories.map(async (category) => await Category.create(category))
    )
    console.log("categories table seeded successfully")

    await Promise.all(
      bookmarks.map(async (bookmark) => {
        //this query looks up the Category ID for the given Category Name
        bookmark.CategoryId = (
          await Category.findOne({ where: { name: bookmark.category } })
        ).id
        //the model we are putting this into does not have a "category" key
        //so getting rid of it before the query to create the record.
        delete bookmark.category
        return await Bookmark.create(bookmark)
      })
    )
    console.log("bookmarks table seeded successfully")
    await db.close()
    console.log("seed complete\ndatabase connection closed")
  } catch (error) {
    console.error(error)
    db.close()
  }
}

seed()
