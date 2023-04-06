# foodie!

A website that allows it's users to scan barcodes of food related items to access nutritional data.

![foodie!](./src/images/foodie.png)

## Live site

[Live site](https://outrageous-tutu-clam.cyclic.app/).

## Description

This repository hosts the project I created during the three week course [Progressive Web Apps](https://github.com/cmda-minor-web/progressive-web-apps-2223/) of the minor [Web Design and Development](https://everythingweb.org/). During this course I was challenged to use server-side rendering.

## Installation

> **NOTE:** Before you can install this project be sure to have both [Node.js](https://nodejs.org/en/download/) and NPM installed. NPM should automatically be installed when installing Node.js. An installation of [Git](https://git-scm.com/downloads) is also required.

You can install the project locally by running the following command in your local folder.

- `git clone https://github.com/Steinberg99/progressive-web-apps-2223/`

When you have cloned the repository be sure to run the command `npm install` to install all of the project dependencies. Run this command in the root folder of the project. When you have done this you can run the command `npm run dev` to start the project. The website should run in the browser when visiting `localhost:4200`.

## Server side rendering

To rewrite my application from [Web Apps from Scratch](https://github.com/cmda-minor-web/web-app-from-scratch-2122). I used express(https://expressjs.com/) to achieve this. Within the `index.js` file in the root folder of my project I set my routes. These can be found in my `routes` folder. So in my server (`index.js`) I access these routes the following way. The `use` method allows me to add custom middleware so I can split my routes.

```js
const barcodeRoutes = require("./routes/barcode");
const homeRoutes = require("./routes/home");
const offlineRoutes = require("./routes/offline");
const productRoutes = require("./routes/product");
const productsRoutes = require("./routes/products");

app.use(barcodeRoutes);
app.use(homeRoutes);
app.use(offlineRoutes);
app.use(productRoutes);
app.use(productsRoutes);
```

An example of one of these routes is the `products.js` file. Whin this file I set my routes for the products overview pages. The route takes a product name and page number from the url. Based on these values it uses the `getProductsByNameAndPageNumber` function that I defined in my `utils` folder. This returns an object that contains the total amount of products and the products themselves. With the render function I render one of my templates, in this case the `products.ejs` template. This approach has two benefits. The client does not have to render the page itself. This is done on the server. The other plus side is that the user does not have to fetch the product data. This is also done on the server. This saves the user precious data and gives a faster experience.

```js
const express = require("express");
const router = express.Router();
const getProductsByNameAndPageNumber = require("../utils/getProductsByNameAndPageNumber");
const checkPreviousNextPage = require("../utils/checkPreviousNextPage");

router.get("/products/:productName/:pageNumber", async (req, res) => {
  const data = await getProductsByNameAndPageNumber(req.params.productName, req.params.pageNumber);
  const pagination = checkPreviousNextPage(data.count, 24, req.params.pageNumber);

  res.render("products", {
    count: data.count,
    pageNumber: parseInt(req.params.pageNumber),
    pagination,
    productName: req.params.productName,
    products: data.products,
  });
});

router.post("/products", (req, res) => {
  res.redirect(`/products/${req.body.product}/1`);
});

// Export the router
module.exports = router;
```

```ejs
<%- include('partials/head') %>

<main class="products">
  <% if (count !== 0) { %>
  <section>
    <h1>Search results for <%= productName %></h1>

    <p><%= count %> results</p>
  </section>

  <% if(pagination.hasPreviousPage || pagination.hasNextPage) { %>
  <div class="pagination">
    <% if(pagination.hasPreviousPage) { %>
      <a href="/products/<%= productName %>/<%= pageNumber - 1 %>">Previous page</a>
    <% } %>

    <% if(pagination.hasNextPage) { %>
      <a href="/products/<%= productName %>/<%= pageNumber + 1 %>">Next page</a>
    <% } %>
  </div>
  <% } %>

  <ul>
    <% products.forEach(product => { %>
    <li class="item">
      <a href="/product/<%= product._id %>">
        <img src="<%= product.image_url %>" alt="" />

        <p><%= product.product_name; %></p>
      </a>
    </li>
    <% }) %>
  </ul>
  <% } else { %>
  <section>
    <h1>Search results for <% productName %></h1>

    <p class="error">We're sorry, but the product you entered is not available in our database.</p>

    <a href="/">Return to home</a>
  </section>
  <% } %>
</main>

<%- include('partials/footer') %>
```

## Build scripts

My project uses npm build scripts to allow for a smooth dev experience. Using [gulp](https://www.npmjs.com/package/gulp) I have written three build files that parse my static files, CSS and client side Javascript into a static folder. These files run when I run the command `npm run watch`. These commands run my `npm run build` commands when whenever a file is changed. This way the corresponding build file will run again whenever a file is changed to allow for a smooth dev experience.

```json
"scripts": {
  "dev": "nodemon index.js & npm run watch",
  "prestart": "npm run build",
  "start": "node index.js",
  "prebuild": "rimraf ./static",
  "build": "npm-run-all build:*",
  "build:assets": "node scripts/build-assets.js",
  "build:css": "node scripts/build-css.js",
  "build:js": "node scripts/build-js.js",
  "watch": "chokidar 'src/**/*.*' --command 'npm run build:assets' & chokidar 'src/css/*.css' --command 'npm run build:css' & chokidar 'src/js/*.js' --command 'npm run build:js'"
}
```

## Converting my website into a progressive web app

To convert my website into a progressive web app I had to implement an `manifest.json` file. This allows my application to be installable. I also had to had to add an offline page to my web app before it was installable. This page is visible under the `/offline` route.

```json
{
  "theme_color": "#014242",
  "background_color": "#014242",
  "display": "standalone",
  "scope": "/",
  "start_url": "/",
  "name": "Foodie",
  "short_name": "Foodie",
  "description": "Foodie, an app that allows its users to live a healthier life!",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## Service worker

To allow cashing in my application I implemented a server worker. The service worker caches the core files and pages a user had visited.

The following code is run whenever the service worker is updated a.k.a whenever it is reinstalled. Within this event I cache all my core files. This being my offline page, CSS file and client side Javascript files.

```js
self.addEventListener("install", (event) => {
  console.log("service-worker.js loaded");

  event.waitUntil(
    caches
      .open(CORE_CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting()),
  );
});
```

The next part of my service worker is used to cache any pages my user visits. This code is run whenever the client makes a fetch. First I check wether or not the request is a request for an HTML page. Whenever this is the case I check if the page is in the client.
`cache.match(event.request)` returns a promise that resolves to a response or undefined. I use this to either return that response if it is present in the cache of fetch the request when it is not a.k.a when it is undefined. When this fetch is done the page is also added to the cache itself. This is done in the `fetchAndCache` function. If this all fails the offline page is returned. This happens in the last `.catch`.

If the request is not for an HTML page I check if my core cache contains the requested file.

```js
self.addEventListener("fetch", (event) => {
  const path = new URL(event.request.url).pathname;

  if (event.request.headers.get("accept").includes("text/html")) {
    event.respondWith(
      caches
        .open(RUNTIME_CACHE)
        .then((cache) => cache.match(event.request))
        .then((response) => response || fetchAndCache(event.request))
        .catch(() => caches.open(CORE_CACHE).then((cache) => cache.match("/offline"))),
    );
  } else if (CORE_ASSETS.includes(path)) {
    event.respondWith(caches.open(CORE_CACHE).then((cache) => cache.match(path)));
  }
});

const fetchAndCache = (request) => {
  return fetch(request).then((response) => {
    const clone = response.clone();

    caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));

    return response;
  });
};
```

## Lighthouse score

![Lighthouse score](./src/images/lighthouse.png)

## Performance

To improve the performance of my application I implemented the following features:

- Minifying of client side Javascript and CSS files.
- Downloaded font files instead of using Google fonts.
- HTTP caching.
- Using compression with express.

### Minifying of client side Javascript and CSS files

One way I improved the performance of my web app is by minifying my client side Javascript and CSS files. I did this by adding the following line to my `build-js.js` and `build-css.js` files.

```js
const gulp = require("gulp");
const minify = require("gulp-minify");
const concat = require("gulp-concat");

return gulp.src(["./src/js/*.js"]).pipe(concat("index.js")).pipe(minify()).pipe(gulp.dest("./static/"));
```

This file accesses all of the files in my `src/js` folder. It then proceeds to concatenate these files into one `index.js` file with the `concat` method. After the files are concatenated they are minified. This means that all of the unnecessary characters (spaces, tabs ect.) are removed from the `index.js` file. By minifying these files they shrink in size. This is important for the users because now they have to download less data to use my site.

### Downloading font files instead of using Google fonts

Another way I improved the perceived performance of my application is by downloading my used fonts in stead of using [Google fonts](https://fonts.google.com/). To use my downloaded fonts I have to create a `@font-face` in my CSS file. The `font-display` property is very important in this case. By setting this property to `swap` we tell the browser that the font block period of the font download lifetime is zero seconds. In this period the fallback font is an invisible font.

The font swap period starts after the font block period. In this period any element attempting to the font must instead render with a fallback font face. This way the text on the page is visible before the font is downloaded. When the font is downloaded it is swapped with the fallback font. By using setting the `font-display` property to `swap` we tell the browser that the font swap period is infinite.

```css
@font-face {
  font-family: "Poppins";
  src: url("./Poppins-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "Poppins";
  src: url("./Poppins-Bold.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
}
```

### HTTP caching

With HTTP caching I reduce the number of requests made between the client and my server. With HTTP caching I store previously requested resources on the client. When the same request is made at a later date the cached response can be accessed. To achieve this I had to add a custom middleware to my express app. This is done with the `setCache()` function. This function intercepts all of the `GET` request my server receives. It proceeds to add the `Cache-control` header to all my responses. This tells the browser to cache the request and subsequent response.

In `index.js`:

```js
app.use(setCache);
```

In `setCache.js` in the `utils` folder:

```js
const setCache = (req, res, next) => {
  const period = 365 * 24 * 60 * 60;

  if (req.method === "GET") {
    res.set("Cache-control", `public, max-age=${period}`);
  } else {
    res.set("Cache-control", `no-store`);
  }

  next();
};

module.exports = setCache;
```

### Using compression with express

By using the following code I tell my app to use the [compression](https://www.npmjs.com/package/compression) middleware. The middleware attempts to compress all of the response data before it is sent to the user. It uses the gzip compression algorithm, which can significantly reduce the size of the response data without losing any information. This can significantly reduce the amount of data the server sends to the user. When these files arrive on the users device the browser proceeds to unzip them.

In `index.js`:

```js
app.use(compression());
```

# Technologies

DogeMeet makes use of the following technologies:

- [Node.js](https://nodejs.org/en/download/),
- [Express](https://expressjs.com/),
- [EJS](https://ejs.co/),
- [Gulp](https://gulpjs.com/),
- [Compression](https://www.npmjs.com/package/compression),
- [Nodemon](https://www.npmjs.com/package/nodemon),

# License

MIT License
