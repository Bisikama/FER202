import { useState, useEffect } from 'react';

export const useFavorite = () => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteOrchids');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteOrchids', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (orchid) => {
    setFavorites(prevFavorites => {
      const isCurrentlyFavorite = prevFavorites.some(fav => fav.id === orchid.id);
      if (isCurrentlyFavorite) {
        return prevFavorites.filter(fav => fav.id !== orchid.id);
      } else {
        return [...prevFavorites, orchid];
      }
    });
  };

  const isFavorite = (orchidId) => {
    return favorites.some(fav => fav.id === orchidId);
  };

  return { favorites, toggleFavorite, isFavorite };
};