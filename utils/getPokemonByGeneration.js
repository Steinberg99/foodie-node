const fetch = require("node-fetch");

const getPokemonByGeneration = async (generationId) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${generationId}`);
    const generationData = await response.json();

    const pokemonUrls = generationData.pokemon_species.map((pokemon) => pokemon.url);
    const pokemonResponses = await Promise.all(pokemonUrls.map((url) => fetch(url)));
    const pokemonData = await Promise.all(pokemonResponses.map((response) => response.json()));

    return pokemonData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getPokemonByGeneration;
