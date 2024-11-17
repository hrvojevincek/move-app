import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDetails } from '../../services/api';
import './details.scss';

const Details = () => {
  const { id } = useParams();
  const location = useLocation();
  const category = location.state?.category || 'action';
  const [item, setItem] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  console.log(category);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getDetails(id);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [id]);

  const handleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!isInWishlist) {
      wishlist.push({ ...item });
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } else {
      const updatedWishlist = wishlist.filter((wishItem) => wishItem.id !== item.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
    setIsInWishlist(!isInWishlist);
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className={`details-container ${category}`}>
      <div className="details-content">
        <div className="details-info">
          <h1>{item.title || item.name}</h1>
          <p className="overview">{item.overview || item.biography}</p>
          <div className="button-group">
            <button className="wishlist-btn" onClick={handleWishlist}>
              {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
            <button className="back-btn" onClick={() => window.history.back()}>
              Back
            </button>
          </div>
        </div>
        <div className="details-image">
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`}
            alt={item.title || item.name}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
