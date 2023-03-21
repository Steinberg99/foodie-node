const express = require("express");
const http = require("http");
const app = express();
const port = process.env.PORT || 4200;
const server = http.createServer(app);

app.set("view engine", "pug");
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

const homeRoutes = require("./routes/home");
const productRoutes = require("./routes/product");

app.use("/", homeRoutes);
app.use("/", productRoutes);

app.use((req, res) => {
  res.status(404).send("Error 404");
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
