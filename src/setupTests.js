import '@testing-library/jest-dom';
import { describe, test, expect } from '@jest/globals';

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
