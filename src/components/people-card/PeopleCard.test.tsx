import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useDispatch, useSelector } from 'react-redux';
import PeopleCard from './PeopleCard.tsx';
import { removePerson } from '../../store/reducers/personSlice.ts';
import { useRouter } from 'next/router';
import { PagePaths } from '../../utils/utils.ts';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('PeopleCard component', () => {
  const mockPerson = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
  };

  const mockDispatch = vi.fn();
  const mockPush = vi.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue(mockPerson);
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });
  it('renders the component with person details', () => {
    render(<PeopleCard />);

    expect(screen.getByText('Card')).toBeInTheDocument();
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Height:')).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
  });

  it('calls handleClose and updates URL when Close button is clicked', () => {
    render(<PeopleCard />);

    fireEvent.click(screen.getByText('Close'));

    expect(mockDispatch).toHaveBeenCalledWith(removePerson());
    expect(mockPush).toHaveBeenCalledWith(`${PagePaths.Main}?`);
  });
});
