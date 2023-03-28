const express = require("express");
const http = require("http");
const app = express();
const port = process.env.PORT || 4200;
const server = http.createServer(app);

app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

const barcodeRoutes = require("./routes/barcode");
const homeRoutes = require("./routes/home");
const offlineRoutes = require("./routes/offline");
const productRoutes = require("./routes/product");

app.use("/", barcodeRoutes);
app.use("/", homeRoutes);
app.use("/", offlineRoutes);
app.use("/", productRoutes);

app.use((req, res) => {
  res.status(404).send("Error 404");
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
