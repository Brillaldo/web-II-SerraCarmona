import React, { useEffect, useState } from 'react';
import './App.css';
import PropertyCard from './components/PropertyCard';

const API_URL =
  'https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/property-listing-data.json';

function App() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setFiltered(data);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const result = value
      ? properties.filter(
          (p) =>
            p.title.toLowerCase().includes(value) ||
            p.description.toLowerCase().includes(value)
        )
      : properties;
    setFiltered(result);
  };

  return (
    <div className="app">
      <div className="hero">
        <img
          src="https://cdn.pixabay.com/photo/2019/07/15/08/32/australia-4338882_1280.jpg"
          alt="hero"
        />
        <div className="hero-text">
          <h1>Book unique places to stay and things to do.</h1>
          <p>Unforgettable trips start with Airbnb.</p>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

     
      <div className="container">
        <div className="property-grid">
          {filtered.map((property, index) => (
            <PropertyCard key={index} data={property} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
