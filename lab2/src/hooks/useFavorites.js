import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('orchid-favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('orchid-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (orchidId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(orchidId)) {
        return prevFavorites.filter(id => id !== orchidId);
      } else {
        return [...prevFavorites, orchidId];
      }
    });
  };

  const isFavorite = (orchidId) => {
    return favorites.includes(orchidId);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoritesCount
  };
};