import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar/Navbar';
import { describe, test, expect } from '@jest/globals';

describe('Navbar', () => {
  test('renders navbar elements', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('CINERAMA')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cinerama/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '' })).toBeInTheDocument();
  });
});
