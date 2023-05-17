const wrapView = require("./viewWrapper.js")
const html = require("html-template-tag")
const inflection = require("inflection") //this is a package that lets us apply title case to a string

function categoriesDetailView(categoryBookmarks) {
  console.log(categoryBookmarks)
  return wrapView(html`
    <div class="row align-items-start gx-5">
      <div class="col-12 col-sm-9">
        <h3 class="text-center my-3">
          "${inflection.titleize(categoryBookmarks[0].name)}" Bookmarks
        </h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Site</th>
              <th class="text-center">Category</th>
              <th class="text-center">Remove</th>
            </tr>
          </thead>
          ${categoryBookmarks[0].Bookmarks.map(
            (bookmark) =>
              html`<tr>
                <td><a href="${bookmark.url}">${bookmark.name}</a></td>
                <td class="text-center">
                  <a href="/categories/${bookmark.CategoryId}"
                    >${categoryBookmarks[0].name}
                  </a>
                </td>
                <td class="text-center">
                  <form
                    class="d-inline"
                    action="/bookmarks/${bookmark.id}?_method=DELETE"
                    method="POST"
                  >
                    <button
                      class="btn btn-danger btn-sm m-1"
                      style="--bs-btn-padding-y: .1rem; --bs-btn-padding-x: .3rem; --bs-btn-font-size: .6rem;"
                    >
                      X
                    </button>
                  </form>
                </td>
              </tr>`
          )}
        </table>
      </div>
      <div class="col-12 col-sm-3">
        <button
          type="submit"
          class="btn btn-primary mb-5 mt-sm-5 w-100"
          onclick="window.location.href='/bookmarks'"
        >
          back
        </button>
      </div>
    </div>
  `)
}

module.exports = categoriesDetailView
