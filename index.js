const express = require("express");
const http = require("http");
const app = express();
const port = process.env.PORT || 4200;
const server = http.createServer(app);

app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

const homeRoutes = require("./routes/home");
const overviewRoutes = require("./routes/generation");
const pokemonRoutes = require("./routes/pokemon");

app.use("/", homeRoutes);
app.use("/", overviewRoutes);
app.use("/", pokemonRoutes);

app.use((req, res) => {
  res.status(404).send("Error 404");
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
