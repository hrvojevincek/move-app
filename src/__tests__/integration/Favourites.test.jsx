import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CarouselCard from '../../components/Carousel/CarouselCard';
import { describe, test, expect, beforeEach } from '@jest/globals';

describe('Favourites Integration', () => {
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test.jpg',
    vote_average: 8.5,
    release_date: '2024-03-15',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test('adds and removes movie from favourites via CarouselCard', async () => {
    render(
      <MemoryRouter>
        <CarouselCard item={mockMovie} category="action" />
      </MemoryRouter>
    );

    // Find and click the favorite button
    const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
    fireEvent.click(favoriteButton);

    // Verify movie was added to localStorage
    let storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    expect(storedFavourites).toHaveLength(1);
    expect(storedFavourites[0]).toEqual(mockMovie);

    // Button should now show as active
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /remove from favorites/i })).toBeInTheDocument();
    });

    // Remove from favorites
    fireEvent.click(screen.getByRole('button', { name: /remove from favorites/i }));

    // Verify movie was removed from localStorage
    storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    expect(storedFavourites).toHaveLength(0);
  });
});
