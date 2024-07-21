import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import PeopleCard from './PeopleCard';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('../../services/Swapi', () => ({
  Swapi: {
    getPerson: vi.fn(),
  },
  personInit: {
    name: '',
    height: '',
    mass: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
  },
  PERSON_PARAM: 'person',
}));

describe('PeopleCard component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (useNavigate as Mock).mockImplementation(() => mockNavigate);
  });

  it('renders initial state correctly', () => {
    render(
      <MemoryRouter>
        <PeopleCard />
      </MemoryRouter>,
    );
    expect(screen.queryByText(/Card/i)).not.toBeInTheDocument();
  });
});
