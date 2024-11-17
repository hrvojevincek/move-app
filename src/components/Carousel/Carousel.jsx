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
    navigate(`/${category}/${movie.id}`);
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
  }, [loading, hasMore, page]);

  useEffect(() => {
    const observer = observerRef.current;
    const lastElement = containerRef.current?.querySelector('.embla__slide:last-child');

    if (lastElement && observer && hasMore) {
      observer.observe(lastElement);
    }

    return () => {
      if (lastElement && observer) {
        observer.unobserve(lastElement);
      }
    };
  }, [movies, hasMore]);

  console.log(movies);

  if (loading && movies.length === 0) {
    return <MovieSkeletonRow />;
  }

  return (
    <div className={`carousel-container--${category}`}>
      <div className="carousel-section">
        <h2>{title}</h2>
        <div className="carousel-wrapper" style={{ position: 'relative' }}>
          <button
            className="carousel__arrow carousel__arrow--left"
            onClick={scrollLeft}
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="carousel-scroll" ref={containerRef} style={{ overflow: 'hidden' }}>
            <div
              className="carousel-scroll__container"
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem',
                transition: 'transform 0.3s ease',
              }}
            >
              {movies.map((item) => (
                <div
                  className="carousel-scroll__slide"
                  key={item.id}
                  onClick={() => handleMovieClick(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleMovieClick(item);
                    }
                  }}
                >
                  <CarouselCard
                    item={item}
                    category={category}
                    isFavorite={isFavorite}
                    toggleFavorite={toggleFavorite}
                  />
                </div>
              ))}
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