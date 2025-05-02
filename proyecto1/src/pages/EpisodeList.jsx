import { useContext, useEffect, useState } from 'react';
import { LikeContext } from '../contexts/LikeContext';
import { Link } from 'react-router-dom';
import '../styles/ListaEpisodio.css';

const EpisodeList = ({ episodes }) => {
  const { likes, toggleLike } = useContext(LikeContext);
  const [episodeImages, setEpisodeImages] = useState({});

  useEffect(() => {
    let isMounted = true;

    const fetchEpisodeImages = async () => {
      const imageEntries = await Promise.all(
        episodes.map(async (episode) => {
          try {
            if (episode.characters.length > 0) {
              const randomIndex = Math.floor(Math.random() * episode.characters.length);
              const characterURL = episode.characters[randomIndex];

              const res = await fetch(characterURL);
              const data = await res.json();
              return [episode.id, data.image];
            }
          } catch (error) {
            console.error(`Error al obtener imagen del episodio ${episode.id}`, error);
          }
          return [episode.id, null];
        })
      );

      if (isMounted) {
        const images = Object.fromEntries(imageEntries);
        setEpisodeImages(images);
      }
    };

    fetchEpisodeImages();

    return () => {
      isMounted = false;
    };
  }, [episodes]);

  return (
    <div className="episode-grid">
      {episodes.map((episode) => (
        <div key={episode.id} className="episode-card">
          {episodeImages[episode.id] && (
            <img
              src={episodeImages[episode.id]}
              alt={`Imagen del episodio ${episode.name}`}
              className="episode-image"
            />
          )}
          <h3>{episode.name}</h3>
          <p>Fecha de estreno: {episode.air_date}</p>
          <button onClick={() => toggleLike(episode.id)}>
            {likes[episode.id] ? 'Quitar Like' : 'Dar Like'}
          </button>
          <p>Likes: {likes[episode.id] ? 1 : 0}</p>
          <Link to={`/episodio/${episode.id}`} className="details-link">
            Ver detalles
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;
