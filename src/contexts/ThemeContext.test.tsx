import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTheme } from './ThemeContext.ts';
import { ThemeProvider } from './ThemeProvider.tsx';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button data-testid="toggle-button" onClick={toggleTheme}>
        Toggle theme
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('provides initial theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeElement = screen.getByTestId('theme');
    expect(themeElement.textContent).toBe('light');
  });

  it('toggles theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeElement = screen.getByTestId('theme');
    const buttonElement = screen.getByTestId('toggle-button');

    expect(themeElement.textContent).toBe('light');

    fireEvent.click(buttonElement);
    expect(themeElement.textContent).toBe('dark');

    fireEvent.click(buttonElement);
    expect(themeElement.textContent).toBe('light');
  });

  it('uses context values correctly in component', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeElement = screen.getByTestId('theme');
    const buttonElement = screen.getByTestId('toggle-button');

    expect(themeElement.textContent).toBe('light');
    fireEvent.click(buttonElement);
    expect(themeElement.textContent).toBe('dark');
  });
});
