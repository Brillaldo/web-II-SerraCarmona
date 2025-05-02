import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StaticPage from './pages/StaticPage';
import Search from './pages/Search';
import EpisodeDetail from './pages/EpisodeDetail';
import CharacterDetail from './pages/CharacterDetail';
import NavBar from './components/NavBar';
import { LikeProvider } from './contexts/LikeContext';
import './styles/app.css';


function App() {
  return (
    <LikeProvider>
      <BrowserRouter>
        <NavBar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/estatica" element={<StaticPage />} />
            <Route path="/busqueda" element={<Search />} />
            <Route path="/episodio/:id" element={<EpisodeDetail />} />
            <Route path="/personaje/:id" element={<CharacterDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LikeProvider>
  );
}

export default App;
