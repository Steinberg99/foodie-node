const fetch = require("node-fetch");

const getPokemonById = async (pokemonId) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokemonData = await response.json();

    return pokemonData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getPokemonById;
