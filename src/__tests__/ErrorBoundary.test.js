import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { describe, test, expect } from '@jest/globals';
import { beforeEach, jest, afterEach } from '@jest/globals';

describe('ErrorBoundary Component', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test('renders error message when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  test('reload button triggers page reload', () => {
    const originalLocation = window.location;
    delete window.location;
    window.location = { reload: jest.fn() };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Try again'));
    expect(window.location.reload).toHaveBeenCalled();

    window.location = originalLocation;
  });
});
