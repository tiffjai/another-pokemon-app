 
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

// Define an asynchronous function named fetchPokemonData that takes a Pokémon name as an argument
const fetchPokemonData = async (name) => {
  // Indicate that data is currently being loaded
  setLoading(true);
  try {
      // Make an HTTP GET request to the PokéAPI to fetch data for the specified Pokémon
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      
      // Check if the response is not OK (status code outside the range 200-299)
      if (!response.ok) {
          // If the response is not OK, throw an error with a message
          throw new Error('Pokemon not found');
      }
      
      // Parse the JSON data from the response
      const data = await response.json();
      
      // Set the fetched Pokémon data to the state
      setPokemonData(data);
  } catch (err) {
      // If an error occurs, set the error message to the state
      setError(err.message);
      
      // Set the Pokémon data to null since the fetch failed
      setPokemonData(null);
  } finally {
      // Indicate that loading has finished
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
    // Main container div with a class name "app"
    <div className="app">
      {/* Heading for the application */}
      <h1>Pokemon App</h1>
  
      {/* Form element that triggers handleSubmit when submitted */}
      <form onSubmit={handleSubmit}>
        {/* Input field for entering the Pokémon name */}
        <input
          type="text" // Specifies the input type as text
          value={pokemonName} // Binds the input value to the state variable pokemonName
          onChange={(e) => setPokemonName(e.target.value)} // Updates the state with the current input value
          placeholder="Enter Pokemon Name" // Placeholder text displayed in the input field
        />
  
        {/* Submit button to trigger the form submission */}
        <button type="submit">Search</button>
      </form>
  
      {/* Displays "Loading..." text when loading is true */}
      {loading && <p>Loading...</p>}
  
      {/* Displays a message when not loading and no Pokémon data or error is present */}
      {!loading && !pokemonData && !error && <p>No pokemon yet, please submit a pokemon!</p>}
  
      {/* Displays an error message if there is an error */}
      {error && <p className="error">{error}</p>}
  
      {/* Displays Pokémon details if pokemonData is available */}
      {pokemonData && (
        <div className="pokemon-details">
          {/* Displays the Pokémon name in uppercase */}
          <h2>{pokemonData.name.toUpperCase()}</h2>
          
          {/* Displays the Pokémon's front sprite image */}
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          
          {/* Displays the Pokémon's height */}
          <p>Height: {pokemonData.height}</p>
          
          {/* Displays the Pokémon's weight */}
          <p>Weight: {pokemonData.weight}</p>
          
          {/* Displays the Pokémon's type(s), joined by commas */}
          <p>Type: {pokemonData.types.map((type) => type.type.name).join(', ')}</p>
        </div>
      )}
    </div>
  );
  
}
export default App;

