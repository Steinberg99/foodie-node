const express = require("express");
const router = express.Router();
const getPokemonByGeneration = require("../utils/getPokemonByGeneration");

router.get("/generation/:generationId", async (req, res) => {
  const pokemonData = await getPokemonByGeneration(req.params.generationId);

  res.render("home", {
    pokemonData,
  });
});

// Export the router
module.exports = router;
