import React from 'react';

const PokemonDetails = ({ pokemonData }) => {
  return (
    <div className="pokemon-details">
      <h2>{pokemonData.name.toUpperCase()}</h2>
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      <p>Height: {pokemonData.height}</p>
      <p>Weight: {pokemonData.weight}</p>
      <p>Type: {pokemonData.types.map((type) => type.type.name).join(', ')}</p>
    </div>
  );
};

export default PokemonDetails;
