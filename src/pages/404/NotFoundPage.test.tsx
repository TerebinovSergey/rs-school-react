import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NotFoundPage from './NotFoundPage.tsx';
import { MemoryRouter } from 'react-router-dom';

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

  it('renders a button with text "Go home"', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    const buttonElement = screen.getByRole('button', { name: 'Go home' });
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick when clicked on the button with the text "Go home"', () => {
    const mockClick = vi.fn();

    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    const buttonElement = screen.getByRole('button', { name: 'Go home' });
    fireEvent.click(buttonElement);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
