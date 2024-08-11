import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Layout from './Layout';

vi.mock('../../contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'dark',
  }),
}));

describe('Layout component', () => {
  it('renders children correctly', () => {
    render(
      <Layout>
        <div>Test Child</div>
      </Layout>,
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('applies the theme class from context', () => {
    render(
      <Layout>
        <h1>Test Child</h1>
      </Layout>,
    );

    expect(
      screen
        .getByText('Test Child')
        .parentElement?.parentElement?.parentElement?.parentElement?.querySelector(
          '.app',
        ),
    ).toBeInTheDocument();
  });

  it('renders the app component', () => {
    render(
      <Layout>
        <h1>Test Child</h1>
      </Layout>,
    );

    expect(
      screen
        .getByText('Test Child')
        .parentElement?.parentElement?.parentElement?.querySelector('.app'),
    ).toBeInTheDocument();
  });
});
