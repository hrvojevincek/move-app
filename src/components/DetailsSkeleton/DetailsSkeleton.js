import React from 'react';
import './Skeleton.scss';
const DetailsSkeleton = ({ category }) => (
  <div className={`details-container ${category}`}>
    <div className="details-content">
      <div className="details-image">
        <div className="skeleton-image pulse"></div>
      </div>
      <div className="details-info">
        <div className="skeleton-title pulse"></div>
        <div className="skeleton-overview pulse"></div>
        <div className="button-group">
          <div className="skeleton-button pulse"></div>
          <div className="skeleton-button pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

export default DetailsSkeleton;
