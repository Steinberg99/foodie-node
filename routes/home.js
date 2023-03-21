const express = require("express");
const router = express.Router();
const getPokemonByGeneration = require("../utils/getPokemonByGeneration");

router.get("/", async (req, res) => {
  const pokemonData = await getPokemonByGeneration(1);

  res.render("home", {
    pokemonData,
  });
});

// Export the router
module.exports = router;
