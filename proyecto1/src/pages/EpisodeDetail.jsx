import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { LikeContext } from '../contexts/LikeContext';
import '../styles/CartaEpisodio.css';

const EpisodeDetail = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const { likes, toggleLike } = useContext(LikeContext);

  useEffect(() => {
    // Fetch details of the episode
    const fetchEpisode = async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
      const data = await response.json();
      setEpisode(data);

      // Fetch character details
      const characterResponses = await Promise.all(
        data.characters.map((characterUrl) => fetch(characterUrl).then((res) => res.json()))
      );
      setCharacters(characterResponses);
    };

    fetchEpisode();
  }, [id]);

  if (!episode) {
    return <p>Cargando detalles del episodio...</p>;
  }

  return (
    <div className="episode-detail">
      <h1>{episode.name}</h1>
      <p>Fecha de estreno: {episode.air_date}</p>
      <p>Código del episodio: {episode.episode}</p>
      <h3>Personajes:</h3>
      <div className="character-grid">
        {characters.map((character) => (
          <div key={character.id} className="character-card">
            <img src={character.image} alt={character.name} className="character-image" />
            <h4>{character.name}</h4>
            <p>{character.species} - {character.status}</p>
            <button onClick={() => toggleLike(character.id)}>
              {likes[character.id] ? 'Quitar Like' : 'Dar Like'}
            </button>
            <p>Likes: {likes[character.id] ? 1 : 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeDetail;