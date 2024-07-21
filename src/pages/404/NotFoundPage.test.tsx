import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFoundPage from './NotFoundPage.tsx';
import { MemoryRouter } from 'react-router-dom';
import { PagePaths } from '../../utils/utils.ts';

describe('not found page', () => {
  it('renders a title with the text "Not found"', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
    const titleElement = screen.getByRole('heading', { name: 'Not found' });
    expect(titleElement).toBeInTheDocument();
  });

  it('renders a link with text "Go home"', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole('link', { name: 'Go home' });
    expect(linkElement).toBeInTheDocument();
  });

  it('contains a link to the main page', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole('link', { name: 'Go home' });
    expect(linkElement).toHaveAttribute('href', PagePaths.Main);
  });
});
