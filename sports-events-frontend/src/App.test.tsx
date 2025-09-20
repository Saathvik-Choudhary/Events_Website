import React from 'react';
import { render, screen } from '@testing-library/react';

// Simple test to verify React is working
test('renders without crashing', () => {
  render(<div>Test</div>);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
