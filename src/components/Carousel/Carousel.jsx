import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState, Suspense } from 'react';
import CarouselCard from './CarouselCard';
import { useNavigate } from 'react-router-dom';
import MovieSkeletonRow from '../Skeleton/MovieSkeleton';

import './Carousel.scss';
const Carousel = ({ category, title, movies, loading, hasMore, fetchMoreMovies, page }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const [isFavorite, setIsFavorite] = useState({});

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -700,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 700,
        behavior: 'smooth',
      });
    }
  };

  const toggleFavorite = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMovieClick = (movie) => {
    navigate(`/details/${movie.id}`, {
      state: { category },
    });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !loading && hasMore) {
          fetchMoreMovies(page + 1);
        }
      });
    }, options);

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [loading, hasMore, page, fetchMoreMovies]);

  useEffect(() => {
    const observer = observerRef.current;
    const sentinelElement = containerRef.current?.querySelector('.carousel-scroll__sentinel');

    if (sentinelElement && observer && hasMore) {
      observer.observe(sentinelElement);
    }

    return () => {
      if (sentinelElement && observer) {
        observer.unobserve(sentinelElement);
      }
    };
  }, [movies, hasMore]);

  if (loading && movies.length === 0) {
    return <MovieSkeletonRow />;
  }

  return (
    <div className={`carousel-container--${category}`}>
      <div className="carousel-section">
        <h2>{title}</h2>
        <div className="carousel-wrapper" style={{ position: 'relative' }}>
          <button className="carousel__arrow carousel__arrow--left" onClick={scrollLeft}>
            <ChevronLeft size={24} />
          </button>

          <div className="carousel-scroll" ref={containerRef} style={{ overflow: 'auto' }}>
            <div className="carousel-scroll__container">
              {movies.map((item) => (
                <div className="carousel-scroll__slide" key={item.id}>
                  <CarouselCard
                    item={item}
                    isFavorite={isFavorite}
                    toggleFavorite={toggleFavorite}
                    onMovieClick={handleMovieClick}
                  />
                </div>
              ))}
              {hasMore && (
                <div
                  className="carousel-scroll__sentinel"
                  style={{
                    width: '1px',
                    height: '100%',
                    position: 'absolute',
                    right: '100px',
                    top: 0,
                  }}
                />
              )}
              {loading && (
                <div className="carousel-loader carousel-loader--loading-more">
                  <span className="carousel-loader__spinner" />
                </div>
              )}
            </div>
          </div>

          <button className="carousel__arrow carousel__arrow--right" onClick={scrollRight}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
