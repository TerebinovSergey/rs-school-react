import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Title from './Title.tsx';

describe('Title component', () => {
  it('renders with the title', () => {
    const testTitle = 'test title';
    render(<Title title={testTitle} />);
    const titleElement = screen.getByText(testTitle);
    expect(titleElement).toBeInTheDocument();
  });
});
