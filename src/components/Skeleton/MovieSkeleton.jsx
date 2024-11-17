import React from 'react';
import './MovieSkeleton.scss';

const MovieSkeleton = () => (
  <div className="skeleton-item">
    <div className="skeleton-image pulse" />
  </div>
);

const MovieSkeletonRow = () => (
  <div className="skeleton-section">
    <div className="skeleton-title pulse" />
    <div className="skeleton-carousel">
      {[...Array(5)].map((_, index) => (
        <MovieSkeleton key={index} />
      ))}
    </div>
  </div>
);

export default MovieSkeletonRow;
