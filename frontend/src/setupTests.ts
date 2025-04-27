import '@testing-library/jest-dom';

// Mock window.URL.createObjectURL
if (typeof window.URL.createObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'createObjectURL', {
    value: jest.fn(),
  });
}

// Mock window.URL.revokeObjectURL
if (typeof window.URL.revokeObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'revokeObjectURL', {
    value: jest.fn(),
  });
}

// Mock clipboard API
Object.defineProperty(window.navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
}); 