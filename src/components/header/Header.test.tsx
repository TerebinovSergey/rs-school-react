import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header.tsx';
import { useTheme } from '../../contexts/ThemeContext.ts';
import { ThemeProvider } from '../../contexts/ThemeProvider.tsx';

vi.mock('../../contexts/ThemeContext.ts', async (importOriginal) => {
  const module =
    await importOriginal<typeof import('../../contexts/ThemeContext.ts')>();
  return {
    ...module,
    useTheme: vi.fn(),
  };
});

describe('Header component', () => {
  const mockToggleTheme = vi.fn();
  const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

  beforeEach(() => {
    mockUseTheme.mockClear();
    mockToggleTheme.mockClear();
  });

  it('renders correctly and displays the initial theme button text', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
    );

    expect(screen.getByText('The Star Wars')).toBeInTheDocument();
    expect(screen.getByText('Dark Theme')).toBeInTheDocument();
  });

  it('calls toggleTheme when button is clicked', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('Dark Theme'));
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('shows the correct button text based on the theme', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    const { rerender } = render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
    );

    expect(screen.getByText('Dark Theme')).toBeInTheDocument();

    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    rerender(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
    );

    expect(screen.getByText('Light Theme')).toBeInTheDocument();
  });
});
