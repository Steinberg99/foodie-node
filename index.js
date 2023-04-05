const express = require("express");
const compression = require("compression");
const http = require("http");
const app = express();
const port = process.env.PORT || 4200;
const server = http.createServer(app);
const setCache = require("./utils/setCache");

app.use(setCache);
app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(compression());

const barcodeRoutes = require("./routes/barcode");
const homeRoutes = require("./routes/home");
const offlineRoutes = require("./routes/offline");
const productRoutes = require("./routes/product");
const productsRoutes = require("./routes/products");

app.use("/", barcodeRoutes);
app.use("/", homeRoutes);
app.use("/", offlineRoutes);
app.use("/", productRoutes);
app.use("/", productsRoutes);

app.use((req, res) => {
  res.status(404).send("Error 404");
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
