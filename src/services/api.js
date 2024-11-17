import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
  },
});

export const getActionMovies = (page = 1) =>
  api.get('/discover/movie', {
    params: {
      with_genres: 28,
      page: page,
    },
  });

export const getComedyMovies = (page = 1) =>
  api.get('/discover/movie', {
    params: {
      with_genres: 35,
      page: page,
    },
  });

export const getSciFiMovies = (page = 1) =>
  api.get('/discover/movie', {
    params: {
      with_genres: 878,
      page: page,
    },
  });

export const getDetails = (movieId) =>
  api.get(`/movie/${movieId}`, {
    params: { language: 'en-US' },
  });
