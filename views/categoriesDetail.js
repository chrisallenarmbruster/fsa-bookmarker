const wrapView = require("./viewWrapper.js")
const html = require("html-template-tag")
const inflection = require("inflection") //this is a package that lets us apply title case to a string

function categoriesDetailView(categoryBookmarks) {
  console.log(categoryBookmarks)
  return wrapView(html`
    <div class="row align-items-start">
      <div class="col">
        <h3>${inflection.titleize(categoryBookmarks[0].name)}</h3>
        ${categoryBookmarks[0].Bookmarks.map(
          (bookmark) =>
            html`<div>
              <a href="${bookmark.url}">${bookmark.name}</a> -
              <a href="/categories/${bookmark.CategoryId}"
                >${categoryBookmarks[0].name}
              </a>
              <form
                class="d-inline"
                action="/bookmarks/${bookmark.id}?_method=DELETE"
                method="POST"
              >
                <button
                  class="btn btn-danger btn-sm m-2"
                  style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .6rem;"
                >
                  X
                </button>
              </form>
            </div>`
        )}
      </div>
      <div class="col">
        <button
          type="submit"
          class="btn btn-primary"
          onclick="window.location.href='/bookmarks'"
        >
          back
        </button>
      </div>
    </div>
  `)
}

module.exports = categoriesDetailView
