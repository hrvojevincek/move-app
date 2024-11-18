import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MovieCarousel from '../../components/Carousel/MovieCarousel';
import { getActionMovies, getComedyMovies, getSciFiMovies } from '../../services/api';

jest.mock('../../services/api');

describe('MovieCarousel Integration', () => {
  const mockMovies = [
    {
      id: 1,
      title: 'Test Movie 1',
      poster_path: '/test1.jpg',
      vote_average: 8.5,
      release_date: '2024-01-01',
    },
    {
      id: 2,
      title: 'Test Movie 2',
      poster_path: '/test2.jpg',
      vote_average: 7.5,
      release_date: '2024-02-01',
    },
  ];

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Mock successful API responses
    getActionMovies.mockResolvedValue({ data: { results: mockMovies } });
    getComedyMovies.mockResolvedValue({ data: { results: mockMovies } });
    getSciFiMovies.mockResolvedValue({ data: { results: mockMovies } });

    // Mock scrollBy since it's not implemented in JSDOM
    Element.prototype.scrollBy = jest.fn();
  });

  test('loads and displays movies from all genres', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <MovieCarousel />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getAllByText('Test Movie 1')).toHaveLength(3);
      expect(screen.getAllByText('Test Movie 2')).toHaveLength(3);
    });

    expect(getActionMovies).toHaveBeenCalledWith(1);
    expect(getComedyMovies).toHaveBeenCalledWith(1);
    expect(getSciFiMovies).toHaveBeenCalledWith(1);
  });

  test('navigation controls work correctly', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <MovieCarousel />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      const nextButtons = screen.getAllByLabelText('Next movies');
      expect(nextButtons).toHaveLength(3); // One for each genre
    });

    const nextButtons = screen.getAllByLabelText('Next movies');

    await act(async () => {
      nextButtons.forEach((button) => {
        fireEvent.click(button);
      });
    });

    // Verify that scrollBy was called for each button click
    expect(Element.prototype.scrollBy).toHaveBeenCalledTimes(3);

    // Verify API calls
    await waitFor(() => {
      expect(getActionMovies).toHaveBeenCalledWith(2);
      expect(getComedyMovies).toHaveBeenCalledWith(2);
      expect(getSciFiMovies).toHaveBeenCalledWith(2);
    });
  });

  test('handles API errors gracefully', async () => {
    // Mock API errors
    getActionMovies.mockRejectedValue(new Error('API Error'));
    getComedyMovies.mockRejectedValue(new Error('API Error'));
    getSciFiMovies.mockRejectedValue(new Error('API Error'));

    render(
      <BrowserRouter>
        <MovieCarousel />
      </BrowserRouter>
    );

    // Wait for the carousel sections to be rendered
    const carousels = await screen.findAllByRole('heading', { level: 2 });
    expect(carousels).toHaveLength(3);
    expect(carousels[0]).toHaveTextContent('Action Movies');
    expect(carousels[1]).toHaveTextContent('Comedy Movies');
    expect(carousels[2]).toHaveTextContent('Sci-Fi Movies');

    // Verify that the carousels are empty (no movies loaded)
    const containers = screen.getAllByTestId('carousel-scroll__container');
    containers.forEach((container) => {
      expect(container.children).toHaveLength(1); // Only sentinel element
    });
  });

  test('previous buttons work correctly', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <MovieCarousel />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      const prevButtons = screen.getAllByLabelText('Previous movies');
      expect(prevButtons).toHaveLength(3);
    });

    const prevButtons = screen.getAllByLabelText('Previous movies');

    // Click next first to enable previous buttons
    const nextButtons = screen.getAllByLabelText('Next movies');
    await act(async () => {
      nextButtons.forEach((button) => fireEvent.click(button));
    });

    // Then click previous
    await act(async () => {
      prevButtons.forEach((button) => fireEvent.click(button));
    });

    expect(Element.prototype.scrollBy).toHaveBeenCalledTimes(6);

    // Verify API calls return to page 1
    await waitFor(() => {
      expect(getActionMovies).toHaveBeenCalledWith(1);
      expect(getComedyMovies).toHaveBeenCalledWith(1);
      expect(getSciFiMovies).toHaveBeenCalledWith(1);
    });
  });

  test('movie cards are clickable and navigate correctly', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <MovieCarousel />
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      const movieCards = screen.getAllByTestId('carousel-item');
      expect(movieCards).toHaveLength(6); // 2 movies × 3 genres

      movieCards.forEach((card) => {
        expect(card).toHaveAttribute('href', expect.stringMatching(/^\/details\/\d+$/));
        expect(card).toHaveAttribute('role', 'button');
      });
    });
  });
});
