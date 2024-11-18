import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import axios from 'axios';

const mockGet = jest.fn();

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: mockGet,
  })),
}));

describe('API Instance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('axios.create is called with correct config', () => {
    require('../../services/api');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://api.themoviedb.org/3',
      headers: {
        accept: 'application/json',
        Authorization: expect.any(String),
      },
    });
  });

  test('getActionMovies calls api.get with correct parameters', async () => {
    const { getActionMovies } = require('../../services/api');
    const mockResponse = { data: { results: [] } };
    mockGet.mockResolvedValueOnce(mockResponse);

    await getActionMovies(1);

    expect(mockGet).toHaveBeenCalledWith('/discover/movie', {
      params: {
        with_genres: 28,
        page: 1,
      },
    });
  });

  test('getComedyMovies calls api.get with correct parameters', async () => {
    const { getComedyMovies } = require('../../services/api');
    const mockResponse = { data: { results: [] } };
    mockGet.mockResolvedValueOnce(mockResponse);

    await getComedyMovies(1);

    expect(mockGet).toHaveBeenCalledWith('/discover/movie', {
      params: {
        with_genres: 35,
        page: 1,
      },
    });
  });

  test('getSciFiMovies calls api.get with correct parameters', async () => {
    const { getSciFiMovies } = require('../../services/api');
    const mockResponse = { data: { results: [] } };
    mockGet.mockResolvedValueOnce(mockResponse);

    await getSciFiMovies(1);

    expect(mockGet).toHaveBeenCalledWith('/discover/movie', {
      params: {
        with_genres: 878,
        page: 1,
      },
    });
  });

  test('getDetails calls api.get with correct parameters', async () => {
    const { getDetails } = require('../../services/api');
    const mockResponse = { data: {} };
    mockGet.mockResolvedValueOnce(mockResponse);

    const movieId = 123;
    await getDetails(movieId);

    expect(mockGet).toHaveBeenCalledWith(`/movie/${movieId}`, {
      params: {
        language: 'en-US',
      },
    });
  });
});
