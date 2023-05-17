const wrapView = require("./viewWrapper.js")
const html = require("html-template-tag")

function bookmarksListView(bookmarks, categories) {
  return wrapView(html`<div class="row align-items-start gx-5">
    <div class="col-12 col-sm-6 ">
      <h3 class="text-center my-3">My Bookmarks</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Site</th>
            <th class="text-center">Category</th>
          </tr>
        </thead>

        ${bookmarks.map(
          (bookmark) =>
            html`<tr>
              <td><a href="${bookmark.url}">${bookmark.name}</a></td>
              <td class="text-center">
                <a href="categories/${bookmark.Category.id}"
                  >${bookmark.Category.name}</a
                >
              </td>
            </tr>`
        )}
      </table>
    </div>
    <div class="col-12 col-sm-6">
      <h3 class="text-center my-3">Add a Bookmark</h3>
      <form class="justify-content-center" action="bookmarks" method="POST">
        <div class="mt-md-5 mb-3">
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
        <div class="col-12 col-md-3">
          <button type="submit" class="btn btn-primary mb-5 w-100">add</button>
        </div>
      </form>
    </div>
  </div>`)
}

module.exports = bookmarksListView
