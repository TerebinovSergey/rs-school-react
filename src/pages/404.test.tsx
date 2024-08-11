import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFoundPage from './404';
import { PagePaths } from '../utils/utils.ts';

describe('not found page', () => {
  it('renders a title with the text "Not found"', () => {
    render(<NotFoundPage />);
    const titleElement = screen.getByRole('heading', { name: 'Not found' });
    expect(titleElement).toBeInTheDocument();
  });

  it('renders a link with text "Go home"', () => {
    render(<NotFoundPage />);

    const linkElement = screen.getByRole('link', { name: 'Go home' });
    expect(linkElement).toBeInTheDocument();
  });

  it('contains a link to the main page', () => {
    render(<NotFoundPage />);

    const linkElement = screen.getByRole('link', { name: 'Go home' });
    expect(linkElement).toHaveAttribute('href', PagePaths.Main);
  });
});
