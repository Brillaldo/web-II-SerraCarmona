import { useEffect, useState } from 'react';
import EpisodeList from './EpisodeList';

const Home = () => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    // Fetch all episodes from the API
    const fetchEpisodes = async () => {
      const response = await fetch('https://rickandmortyapi.com/api/episode');
      const data = await response.json();
      setEpisodes(data.results); // Set the episodes from the API response
    };

    fetchEpisodes();
  }, []);

  return (
    <div>
      <h1 >The Rick and Morty Api</h1>
      <EpisodeList episodes={episodes} />
    </div>
  );
};

export default Home;
