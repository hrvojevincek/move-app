import { describe, expect, jest, test, beforeEach } from '@jest/globals';
import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import Details from '../../pages/Details/Details';
import { getDetails } from '../../services/api';

jest.mock('../../services/api');

describe('Details Integration', () => {
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    overview: 'Test Overview',
    poster_path: '/test.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading skeleton initially', async () => {
    getDetails.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('details-skeleton')).toBeInTheDocument();
  });

  test('displays movie details when API call succeeds', async () => {
    getDetails.mockResolvedValue({ data: mockMovie });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/details/1']}>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
      expect(screen.getByText('Test Overview')).toBeInTheDocument();
    });
  });

  test('displays error boundary when movie is not found', async () => {
    getDetails.mockRejectedValue(new Error('Movie not found'));

    await act(async () => {
      render(
        <ErrorBoundary>
          <MemoryRouter initialEntries={['/details/99999999']}>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </MemoryRouter>
        </ErrorBoundary>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
      expect(screen.getByText(/Unable to find the requested item/)).toBeInTheDocument();
      expect(screen.getByText('Try again')).toBeInTheDocument();
      expect(screen.getByText('Go to home')).toBeInTheDocument();
    });
  });
});
