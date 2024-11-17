import { Heart, Star } from 'lucide-react';
import React from 'react';
import { useFavourites } from '../../hooks/useFavourites';

const CarouselCard = ({ item, onMovieClick }) => {
  const { isInFavourites, addToFavourites, removeFromFavourites } = useFavourites();

  const handleClick = (e) => {
    if (!e.target.closest('.favorite-btn')) {
      onMovieClick(item);
    }
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInFavourites(item.id)) {
      removeFromFavourites(item.id);
    } else {
      addToFavourites(item);
    }
  };

  return (
    <div
      className="carousel__item"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
    >
      <div className="carousel__item-content">
        <img
          src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
          loading="lazy"
          decoding="async"
          alt={item.title}
        />
        <div className="carousel__item-overlay">
          <h3>{item.title}</h3>
          <div className="carousel__item-details">
            <div className="carousel__item-rating">
              <Star size={15} className="star-icon" />
              <span>{item.vote_average?.toFixed(1)}</span>
            </div>
            <div className="carousel__item-year">
              {new Date(item.release_date || item.first_air_date).getFullYear()}
            </div>
          </div>
          <button
            className={`favorite-btn ${isInFavourites(item.id) ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={`${isInFavourites(item.id) ? 'Remove from favorites' : 'Add to favorites'}`}
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
