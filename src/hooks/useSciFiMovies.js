import { useState, useEffect } from 'react';
import { getSciFiMovies } from '../services/api';

export const useSciFiMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreMovies = async (nextPage) => {
    try {
      setLoading(true);
      const response = await getSciFiMovies(nextPage);
      const newMovies = response.data.results;

      const uniqueNewMovies = newMovies.filter(
        (newMovie) => !movies.some((existingMovie) => existingMovie.id === newMovie.id)
      );

      setMovies((prev) => [...prev, ...uniqueNewMovies]);
      setHasMore(uniqueNewMovies.length > 0);
      setPage(nextPage);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreMovies(1);
  }, []);

  return { movies, loading, error, hasMore, fetchMoreMovies, page };
};
