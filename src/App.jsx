 
import React, { useState, useEffect } from 'react';

const App = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Reset error when pokemonName changes
    if (pokemonName) {
      setError('');
    }
  }, [pokemonName]);

  const fetchPokemonData = async (name) => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();
      setPokemonData(data);
    } catch (err) {
      setError(err.message);
      setPokemonData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pokemonName) {
      fetchPokemonData(pokemonName);
    }
  };

  return (
    <div className="app">
      <h1>Pokemon App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Enter Pokemon Name"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {!loading && !pokemonData && !error && <p>No pokemon yet, please submit a pokemon!</p>}
      {error && <p className="error">{error}</p>}
      {pokemonData && (
        <div className="pokemon-details">
          <h2>{pokemonData.name.toUpperCase()}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>Type: {pokemonData.types.map((type) => type.type.name).join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default App;

