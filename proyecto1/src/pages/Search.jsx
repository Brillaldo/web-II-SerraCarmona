import { useReducer } from 'react';
import SearchForm from './SearchForm';
import CharacterList from './CharacterList';

const initialState = {
  characters: [],
  loading: false,
  filters: {
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_CHARACTERS':
      return {
        ...state,
        characters: action.payload,
      };
    default:
      return state;
  }
};

const Search = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSearch = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });

    const query = Object.entries(state.filters)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?${query}`);
      const data = await response.json();
      dispatch({ type: 'SET_CHARACTERS', payload: data.results || [] });
    } catch (error) {
      console.error('Error al buscar personajes:', error);
      dispatch({ type: 'SET_CHARACTERS', payload: [] });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <div className="search-page">
      <h1>Buscar Personajes</h1>
      <SearchForm
        filters={state.filters}
        dispatch={dispatch}
        onSearch={handleSearch}
      />
      {state.loading ? (
        <p>Cargando...</p>
      ) : (
        <CharacterList characters={state.characters} />
      )}
    </div>
  );
};

export default Search;
