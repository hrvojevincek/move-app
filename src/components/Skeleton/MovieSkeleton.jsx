import React from 'react';
import './MovieSkeleton.scss';

const MovieSkeleton = () => (
  <div className="skeleton-item" data-testid="movie-skeleton-row">
    <div className="skeleton-image pulse" />
  </div>
);

const MovieSkeletonRow = () => (
  <div className="skeleton-section" data-testid="movie-skeleton-row">
    <div className="skeleton-title pulse" />
    <div className="skeleton-carousel">
      {[...Array(5)].map((_, index) => (
        <MovieSkeleton key={index} />
      ))}
    </div>
  </div>
);

export default MovieSkeletonRow;
