import { useState, useEffect } from 'react';

export const useFavourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    setFavourites(storedFavourites);
  }, []);

  const addToFavourites = (item) => {
    const updatedFavourites = [...favourites, item];
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  const removeFromFavourites = (itemId) => {
    const updatedFavourites = favourites.filter((item) => item.id !== itemId);
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  const isInFavourites = (itemId) => {
    return favourites.some((item) => item.id === itemId);
  };

  return {
    favourites,
    addToFavourites,
    removeFromFavourites,
    isInFavourites,
  };
};
