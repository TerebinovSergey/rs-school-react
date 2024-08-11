import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ErrorThrowing from './ErrorThrowing';
import ErrorBoundary from '../error-boundary/ErrorBoundary';

describe('ErrorThrowing component', () => {
  it('renders the button with the text "To make a mistake"', () => {
    render(<ErrorThrowing />);
    expect(
      screen.getByRole('button', { name: /To make a mistake/i }),
    ).toBeInTheDocument();
  });

  it('throws an error when button is clicked', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowing />
      </ErrorBoundary>,
    );

    const button = screen.getByRole('button', { name: /To make a mistake/i });
    fireEvent.click(button);

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    consoleError.mockRestore();
  });
});
