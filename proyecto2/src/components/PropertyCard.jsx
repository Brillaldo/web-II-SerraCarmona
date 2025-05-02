import React from 'react';
import { FaUser, FaBed, FaStar } from 'react-icons/fa';
import '../styles/PropertyCard.css';

function PropertyCard({ data }) {
  return (
    <div className="card">
      {data.superHost && <span className="superhost">Superhost</span>}
      <img src={data.image} alt={data.title} />
      <div className="card-body">
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        <div className="icons">
          <span><FaBed /> {data.beds} bedroom</span>
          <span><FaUser /> {data.guests} Guest</span>
        </div>
        <div className="footer">
          <span>${data.price}/night</span>
          <span><FaStar color="orange" /> {data.rating}</span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
