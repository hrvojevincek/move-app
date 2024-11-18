import '@testing-library/jest-dom';
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';

const originalError = console.error;

beforeAll(() => {
  // Mock console.error before all tests
  console.error = (...args) => {
    // Suppress specific React error boundary warnings
    if (
      /The above error occurred in the <Details> component/.test(args[0]) ||
      /Error: Uncaught/.test(args[0]) ||
      args[0].includes('React will try to recreate this component tree')
    ) {
      return;
    }
    // Keep original behavior for other console.error calls
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  // Restore original console.error after all tests
  console.error = originalError;
});

describe('Setup Tests', () => {
  test('testing environment is working', () => {
    expect(true).toBeTruthy();
  });
});

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe(element) {
    this.callback([
      {
        isIntersecting: true,
        target: element,
      },
    ]);
  }

  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = MockIntersectionObserver;
