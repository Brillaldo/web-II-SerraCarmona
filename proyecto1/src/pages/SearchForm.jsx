import { useState } from 'react';
import '../styles/formulario.css'; 
const SearchForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters); // Llama a la función de búsqueda con los filtros
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={filters.name}
        onChange={handleChange}
      />
      <select name="status" value={filters.status} onChange={handleChange}>
        <option value="">Estado</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <input
        type="text"
        name="species"
        placeholder="Especie"
        value={filters.species}
        onChange={handleChange}
      />
      <input
        type="text"
        name="type"
        placeholder="Tipo"
        value={filters.type}
        onChange={handleChange}
      />
      <select name="gender" value={filters.gender} onChange={handleChange}>
        <option value="">Género</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchForm;