import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PeopleItem from './PeopleItem';

describe('PeopleItem component', () => {
  const mockProps = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
  };

  it('renders initial state correctly', () => {
    render(<PeopleItem {...mockProps} />);
    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText(/Height:/)).toBeInTheDocument();
    expect(screen.getByText(/Mass:/)).toBeInTheDocument();
  });

  it('displays the correct name', () => {
    render(<PeopleItem {...mockProps} />);
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
  });

  it('displays the correct height', () => {
    render(<PeopleItem {...mockProps} />);
    expect(screen.getByText(mockProps.height)).toBeInTheDocument();
  });

  it('displays the correct mass', () => {
    render(<PeopleItem {...mockProps} />);
    expect(screen.getByText(mockProps.mass)).toBeInTheDocument();
  });
});
