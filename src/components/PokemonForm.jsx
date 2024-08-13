import React from 'react';

const PokemonForm = ({ pokemonName, setPokemonName, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter Pokemon Name"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default PokemonForm;
