import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import store from '../../store';

describe('MainPage component', () => {
  it('renders Search, PeopleList', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
