import { useEffect, useState } from "react";
import {
  fetchAllPokemon,
  fetchPokemonDetailsByName,
  fetchEvolutionChainById,
  fetchPokemonSpeciesByName,
} from "./api";

function App() {
  const [pokemonIndex, setPokemonIndex] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pokemonDetails, setPokemonDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setLoadingDetails] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { results: pokemonList } = await fetchAllPokemon();

        setPokemon(pokemonList);
        setPokemonIndex(pokemonList);
      } catch (err) {
        alert("Error: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const onSearchValueChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    setPokemon(
      pokemonIndex.filter((monster) =>
        monster.name.toLowerCase().includes(value)
      )
    );
  };

  const onGetDetails = async (name) => {
    // Avoid re-fetching the same Pokémon details

    if (pokemonDetails?.name === name) {
      return;
    }

    try {
      setLoadingDetails(true);

      // Fetch Pokémon details
      const details = await fetchPokemonDetailsByName(name);

      const speciesResponse = await fetchPokemonSpeciesByName(name);

      const evolutionChainId = speciesResponse.evolution_chain.url
        .split("/")
        .slice(-2, -1)[0];

      const evolutionData = await fetchEvolutionChainById(evolutionChainId);

      const evolutionChain = extractEvolutionChain(evolutionData);

      setPokemonDetails({
        name: details.name,
        types: details.types.map((typeInfo) => typeInfo.type.name),
        moves: details.moves.slice(0, 4).map((moveInfo) => moveInfo.move.name),
        evolutionChain,
      });
    } catch (error) {
      alert("Failed to fetch Pokémon details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const extractEvolutionChain = (evolutionData) => {
    const chain = [];

    const traverseChain = (node) => {
      if (!node) return;
      chain.push(node.species.name);
      node.evolves_to.forEach(traverseChain);
    };

    traverseChain(evolutionData.chain);

    return chain.join(", ");
  };

  return (
    <div className={"pokedex__container"}>
      <div className={"pokedex__search-input"}>
        <label for="search" className="sr-only">
          Search Pokémon
        </label>
        <input
          name="search"
          value={searchValue}
          onChange={onSearchValueChange}
          placeholder={"Search Pokémon"}
        />
      </div>
      <div className={"pokedex__content"}>
        {!loading && pokemon.length > 0 ? (
          <div className={"pokedex__search-results"}>
            {pokemon.map((monster) => (
              <div className={"pokedex__list-item"} key={monster.name}>
                <div>{monster.name}</div>
                <button
                  onClick={() => onGetDetails(monster.name)}
                  aria-label={`View details for ${monster.name}`}
                >
                  Get Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className={"pokedex__no-results"}>No results found</div>
        )}
        {pokemonDetails && (
          <div className="pokedex__details" aria-live="polite">
            {detailsLoading && (
              <div aria-live="polite">
                {detailsLoading && <p aria-busy="true"></p>}
              </div>
            )}
            <h2>{pokemonDetails.name}</h2>
            <div className="pokedex__details-content">
              <div className="pokedex__details-types">
                <strong>Types</strong>
                <ul>
                  {pokemonDetails.types.map((type) => (
                    <li key={type}>{type}</li>
                  ))}
                </ul>
              </div>
              <div className="pokedex__details-moves">
                <strong>Moves</strong>
                <ul>
                  {pokemonDetails.moves.map((move) => (
                    <li key={move}>{move}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pokedex__details-evolutions">
              <strong>Evolutions</strong>
              <div className="evolution-chain">
                {pokemonDetails.evolutionChain.split(", ").map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
