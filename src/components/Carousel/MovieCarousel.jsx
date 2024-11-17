import React, { Suspense } from 'react';

import { getActionMovies, getComedyMovies, getSciFiMovies } from '../../services/api';
import { useActionMovies } from '../../hooks/useActionMovies';
import { useComedyMovies } from '../../hooks/useComedyMovies';
import { useSciFiMovies } from '../../hooks/useSciFiMovies';
import Carousel from './Carousel';
import MovieSkeletonRow from '../Skeleton/MovieSkeleton';

const MovieCarousel = () => {
  const {
    movies: actionMovies,
    loading: actionLoading,
    error: actionError,
    hasMore: actionHasMore,
    fetchMoreMovies: fetchMoreActionMovies,
    page: actionPage,
  } = useActionMovies();

  const {
    movies: comedyMovies,
    loading: comedyLoading,
    error: comedyError,
    hasMore: comedyHasMore,
    fetchMoreMovies: fetchMoreComedyMovies,
    page: comedyPage,
  } = useComedyMovies();

  const {
    movies: scifiMovies,
    loading: scifiLoading,
    error: scifiError,
    hasMore: scifiHasMore,
    fetchMoreMovies: fetchMoreScifiMovies,
    page: scifiPage,
  } = useSciFiMovies();

  return (
    <div className="movie-carousels">
      <Suspense fallback={<MovieSkeletonRow />}>
        <Carousel
          category="action"
          title="Action Movies"
          fetchFunction={getActionMovies}
          movies={actionMovies}
          loading={actionLoading}
          hasMore={actionHasMore}
          fetchMoreMovies={fetchMoreActionMovies}
          page={actionPage}
        />
      </Suspense>

      <Suspense fallback={<MovieSkeletonRow />}>
        <Carousel
          category="comedy"
          title="Comedy Movies"
          fetchFunction={getComedyMovies}
          movies={comedyMovies}
          loading={comedyLoading}
          hasMore={comedyHasMore}
          fetchMoreMovies={fetchMoreComedyMovies}
          page={comedyPage}
        />
      </Suspense>

      <Suspense fallback={<MovieSkeletonRow />}>
        <Carousel
          category="scifi"
          title="Sci-Fi Movies"
          fetchFunction={getSciFiMovies}
          movies={scifiMovies}
          loading={scifiLoading}
          hasMore={scifiHasMore}
          fetchMoreMovies={fetchMoreScifiMovies}
          page={scifiPage}
        />
      </Suspense>
    </div>
  );
};

export default MovieCarousel;
