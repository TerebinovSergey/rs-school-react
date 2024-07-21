import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';

describe('MainPage component', () => {
  it('renders Search, PeopleList', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
