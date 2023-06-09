//function wraps our views w/ everything that goes outside the body, adds a header/navbar

function wrapView(content) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>The Bookmarker App</title>
        <!--linking in Bootstrap stylesheet -->
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        />
        <!--linking in our stylesheet for any overrides-->
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <nav class="navbar bg-dark" data-bs-theme="dark">
          <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">The Bookmarker App</span>
          </div>
        </nav>
        <div class="container mt-3">${content}</div>
        <!--linking in Bootstrap script support -->
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
          crossorigin="anonymous"
        ></script>
      </body>
    </html>`
}

module.exports = wrapView
