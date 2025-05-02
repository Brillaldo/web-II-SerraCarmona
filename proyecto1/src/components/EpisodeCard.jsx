import { useContext } from 'react';
import { LikeContext } from '../contexts/LikeContext';
import { useNavigate } from 'react-router-dom';

const EpisodeCard = ({ episode }) => {
  const { likes, dispatch } = useContext(LikeContext);
  const navigate = useNavigate();

  const handleLike = () => dispatch({ type: 'LIKE', payload: { id: episode.id } });
  const handleDislike = () => dispatch({ type: 'DISLIKE', payload: { id: episode.id } });

  return (
    <div className="card">
      <h3>{episode.name}</h3>
      <p>{episode.episode}</p>
      <button onClick={handleLike}>👍 Like</button>
      <button onClick={handleDislike}>👎 No Like</button>
      <p>Votos: {likes[episode.id] || 0}</p>
      <button onClick={() => navigate(`/episodio/${episode.id}`)}>Ver Detalle</button>
    </div>
  );
};

export default EpisodeCard;
