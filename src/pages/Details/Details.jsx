import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDetails } from '../../services/api';
import './details.scss';
import { useFavourites } from '../../hooks/useFavourites';
import DetailsSkeleton from '../../components/DetailsSkeleton/DetailsSkeleton';

const Details = () => {
  const { id } = useParams();
  const location = useLocation();
  const category = location.state?.category || 'action';
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const { isInFavourites, addToFavourites, removeFromFavourites } = useFavourites();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getDetails(id);
        console.log(response);
        if (!response.data) {
          setError(new Error('Item not found'));
          return;
        }
        setItem(response.data);
      } catch (error) {
        setError(
          new Error(
            "Unable to find the requested item. It might have been removed or doesn't exist."
          )
        );
      }
    };

    fetchDetails();
  }, [id]);

  const handleWishlist = () => {
    if (!isInFavourites(item.id)) {
      addToFavourites(item);
    } else {
      removeFromFavourites(item.id);
    }
  };

  if (error) {
    throw error;
  }

  if (!item) return <DetailsSkeleton category={category} />;

  return (
    <div className={`details-container ${category}`}>
      <div className="details-content">
        <div className="details-image">
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`}
            alt={item.title || item.name}
          />
        </div>
        <div className="details-info">
          <h1>{item.title || item.name}</h1>
          <p className="overview">{item.overview || item.biography}</p>
          <div className="button-group">
            <button className="wishlist-btn" onClick={handleWishlist}>
              {isInFavourites(item.id) ? 'Remove from Favourites' : 'Add to Favourites'}
            </button>
            <button className="back-btn" onClick={() => window.history.back()}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
