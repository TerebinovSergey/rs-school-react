import { render, screen } from '@testing-library/react';
import App from './App';

describe('Index Component', () => {
  it('renders App component without crashing', () => {
    render(<App />);
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });
});
