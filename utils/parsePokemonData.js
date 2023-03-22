const parsePokemonData = (pokemonData) => {
  return pokemonData.map((pokemon) => ({
    height: pokemon.height,
    id: pokemon.id,
    name: pokemon.name,
    weight: pokemon.weight,
  }));
};

module.exports = parsePokemonData;
