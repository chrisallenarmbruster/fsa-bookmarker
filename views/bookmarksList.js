const wrapView = require("./viewWrapper.js")
const html = require("html-template-tag")

function bookmarksListView(bookmarks, categories) {
  return wrapView(html`<div class="row align-items-start">
    <div class="col">
      <h3>My Bookmarks</h3>
      ${bookmarks.map(
        (bookmark) =>
          html`<div class="mb-1"><a href="${bookmark.url}">${bookmark.name}</a> - 
          <a href="categories/${bookmark.Category.id}">${bookmark.Category.name}</div></a>`
      )}
    </div>
    <div class="col">
      <h3>Add a Bookmark</h3>
      <form action="bookmarks" method="POST">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            name="name"
            placeholder="name ( website )"
          />
        </div>
        <div class="mb-3">
          <input
            type="url"
            class="form-control"
            name="url"
            placeholder="url ( http://website.com )"
          />
        </div>

        <div class="mb-3">
          <select
            class="form-select"
            aria-label="Default select example"
            name="CategoryId"
          >
            <option value="" disabled selected>category</option>
            ${categories.map(
              (category) =>
                html` <option value="${category.id}">${category.name}</option> `
            )}
          </select>
        </div>
        <button type="submit" class="btn btn-primary">add</button>
      </form>
    </div>
  </div>`)
}

module.exports = bookmarksListView
