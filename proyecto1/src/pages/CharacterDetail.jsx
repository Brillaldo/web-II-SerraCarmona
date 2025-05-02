import { useParams } from 'react-router-dom';

const CharacterDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Detalle del Personaje</h2>
      <p>ID del personaje: {id}</p>
    </div>
  );
};

export default CharacterDetail;