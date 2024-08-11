import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary component', () => {
  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child component</div>
      </ErrorBoundary>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders error message when error is thrown', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});
