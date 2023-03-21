const express = require("express");
const router = express.Router();
const getPokemonById = require("../utils/getPokemonById");

router.get("/pokemon/:pokemonId", async (req, res) => {
  const pokemonData = await getPokemonById(req.params.pokemonId);

  res.render("pokemon", {
    pokemonData,
  });
});

// Export the router
module.exports = router;
