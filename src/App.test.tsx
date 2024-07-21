import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './store.ts';

describe('App component', () => {
  it('renders search button', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const searchButton = screen.getByText(/search/i);
    expect(searchButton).toBeInTheDocument();
  });
});
