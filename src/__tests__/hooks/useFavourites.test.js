import { renderHook, act } from '@testing-library/react';
import { useFavourites } from '../../hooks/useFavourites';
import { describe, test, expect, beforeEach } from '@jest/globals';

describe('useFavourites Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test.jpg',
    vote_average: 8.5,
    release_date: '2024-03-15',
  };

  test('should initialize with empty favourites', () => {
    const { result } = renderHook(() => useFavourites());
    expect(result.current.favourites).toEqual([]);
  });

  test('should add movie to favourites and localStorage', () => {
    const { result } = renderHook(() => useFavourites());

    act(() => {
      result.current.addToFavourites(mockMovie);
    });

    // Check hook state
    expect(result.current.favourites).toHaveLength(1);
    expect(result.current.favourites[0]).toEqual(mockMovie);
    expect(result.current.isInFavourites(mockMovie.id)).toBe(true);

    // Check localStorage
    const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    expect(storedFavourites).toHaveLength(1);
    expect(storedFavourites[0]).toEqual(mockMovie);
  });

  test('should remove movie from favourites and localStorage', () => {
    const { result } = renderHook(() => useFavourites());

    // Add first
    act(() => {
      result.current.addToFavourites(mockMovie);
    });

    // Then remove
    act(() => {
      result.current.removeFromFavourites(mockMovie.id);
    });

    // Check hook state
    expect(result.current.favourites).toHaveLength(0);
    expect(result.current.isInFavourites(mockMovie.id)).toBe(false);

    // Check localStorage
    const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    expect(storedFavourites).toHaveLength(0);
  });

  test('should load favourites from localStorage on initialization', () => {
    // Set up initial state in localStorage
    localStorage.setItem('favourites', JSON.stringify([mockMovie]));

    const { result } = renderHook(() => useFavourites());

    expect(result.current.favourites).toHaveLength(1);
    expect(result.current.favourites[0]).toEqual(mockMovie);
    expect(result.current.isInFavourites(mockMovie.id)).toBe(true);
  });

  test('should not add duplicate movies', () => {
    const { result } = renderHook(() => useFavourites());

    act(() => {
      result.current.addToFavourites(mockMovie);
      result.current.addToFavourites(mockMovie);
    });

    expect(result.current.favourites).toHaveLength(1);
    const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    expect(storedFavourites).toHaveLength(1);
  });
});
