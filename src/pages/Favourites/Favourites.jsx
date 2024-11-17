import React from 'react';
import { useFavourites } from '../../hooks/useFavourites';
import { useNavigate } from 'react-router-dom';
import './Favourites.scss';

const Favourites = () => {
  const { favourites, removeFromFavourites } = useFavourites();
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    navigate(`/details/${movie.id}`);
  };

  return (
    <div className="favourites-container">
      {favourites.length > 0 ? (
        <div className="favourites-grid">
          {favourites.map((movie) => (
            <div
              key={movie.id}
              className="favourite-card"
              onClick={() => handleMovieClick(movie)}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
              <div className="favourite-card__overlay">
                <h3>{movie.title}</h3>
                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromFavourites(movie.id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-favourites">
          <p>You haven&apos;t added any movies to your favourites yet.</p>
        </div>
      )}
    </div>
  );
};

export default Favourites;
