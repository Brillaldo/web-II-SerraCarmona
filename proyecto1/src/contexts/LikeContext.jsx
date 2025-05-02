import { createContext, useState, useEffect } from 'react';

export const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('likes');
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  const toggleLike = (id) => {
    setLikes((prevLikes) => {
      const updatedLikes = { ...prevLikes };
      if (updatedLikes[id]) {
        delete updatedLikes[id]; // Quitar el like si ya existe
      } else {
        updatedLikes[id] = true; // Agregar el like
      }
      localStorage.setItem('likes', JSON.stringify(updatedLikes)); // Guardar en localStorage
      return updatedLikes;
    });
  };

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  return (
    <LikeContext.Provider value={{ likes, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};
