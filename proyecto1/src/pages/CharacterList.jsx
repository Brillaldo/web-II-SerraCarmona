import { useContext } from 'react';
import { LikeContext } from '../contexts/LikeContext';
import '../styles/PersonajeLista.css';

const CharacterList = ({ characters }) => {
  const { likes, toggleLike } = useContext(LikeContext);

  return (
    <div className="character-grid">
    
      {characters.map((character) => (
        <div key={character.id} className="character-card">
          <img src={character.image} alt={character.name} className="character-image" />
          <h4>{character.name}</h4>
          <p>{character.species} - {character.status}</p>
          <button onClick={() => toggleLike(character.id)}>
            {likes[character.id] ? 'Quitar Like' : 'Dar Like'}
          </button>
          <p>Like: {likes[character.id] ? 1 : 0}</p>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;