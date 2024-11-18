import React from 'react';
import { beforeEach, describe, expect, test, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { useFavourites } from '../../hooks/useFavourites';
import CarouselCard from '../../components/Carousel/CarouselCard';

jest.mock('../../hooks/useFavourites');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CarouselCard Component', () => {
  const mockItem = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test.jpg',
    vote_average: 8.5,
    release_date: '2024-03-15',
  };

  beforeEach(() => {
    useFavourites.mockReturnValue({
      isInFavourites: jest.fn().mockReturnValue(false),
      addToFavourites: jest.fn(),
      removeFromFavourites: jest.fn(),
    });
  });

  test('navigates to details page when clicking the card', () => {
    render(
      <MemoryRouter>
        <CarouselCard item={mockItem} category="action" />
      </MemoryRouter>
    );

    const link = screen.getByTestId('carousel-item');
    expect(link).toHaveAttribute('href', `/details/${mockItem.id}`);
  });

  test('renders movie card with correct information', () => {
    render(
      <MemoryRouter>
        <CarouselCard item={mockItem} category="action" />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300/test.jpg'
    );
  });

  test('handles favorite button click correctly', () => {
    const { isInFavourites, addToFavourites, removeFromFavourites } = useFavourites();

    render(
      <MemoryRouter>
        <CarouselCard item={mockItem} category="action" />
      </MemoryRouter>
    );

    const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });

    // Click to add to favorites
    fireEvent.click(favoriteButton);
    expect(addToFavourites).toHaveBeenCalledWith(mockItem);

    // Mock favorite status change
    isInFavourites.mockReturnValue(true);

    // Click to remove from favorites
    fireEvent.click(favoriteButton);
    expect(removeFromFavourites).toHaveBeenCalledWith(mockItem.id);
  });
});
