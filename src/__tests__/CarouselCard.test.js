import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CarouselCard from '../components/Carousel/CarouselCard';
import { useFavourites } from '../hooks/useFavourites';
import { describe, test, expect } from '@jest/globals';
import { beforeEach, jest } from '@jest/globals';

jest.mock('../hooks/useFavourites');

describe('CarouselCard Component', () => {
  const mockItem = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test.jpg',
    vote_average: 8.5,
    release_date: '2024-03-15',
  };

  const mockOnMovieClick = jest.fn();

  beforeEach(() => {
    useFavourites.mockReturnValue({
      isInFavourites: jest.fn().mockReturnValue(false),
      addToFavourites: jest.fn(),
      removeFromFavourites: jest.fn(),
    });
  });

  test('renders movie card with correct information', () => {
    render(<CarouselCard item={mockItem} onMovieClick={mockOnMovieClick} />);

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300/test.jpg'
    );
  });

  test('calls onMovieClick when clicking the card', () => {
    render(<CarouselCard item={mockItem} onMovieClick={mockOnMovieClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockOnMovieClick).toHaveBeenCalledWith(mockItem);
  });
});
