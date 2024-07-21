import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App.tsx';

describe('App component', () => {
  it('renders search button', () => {
    render(<App />);
    const searchButton = screen.getByText(/search/i);
    expect(searchButton).toBeInTheDocument();
  });
});
