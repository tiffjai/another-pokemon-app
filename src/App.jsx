import React, { useState, useEffect } from 'react';
import PokemonForm from './components/PokemonForm';
import PokemonDetails from './components/PokemonDetails';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';

// Main App component
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

  // Fetch Pokemon data
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

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (pokemonName) {
      fetchPokemonData(pokemonName);
    }
  };

  return (
    <div className="app">
      <h1>Pokemon App</h1>
      <PokemonForm 
        pokemonName={pokemonName} 
        setPokemonName={setPokemonName} 
        handleSubmit={handleSubmit} 
      />
      {loading && <LoadingIndicator />}
      {!loading && !pokemonData && !error && <p>No pokemon yet, please submit a pokemon!</p>}
      {error && <ErrorMessage error={error} />}
      {pokemonData && <PokemonDetails pokemonData={pokemonData} />}
    </div>
  );
};

export default App;


