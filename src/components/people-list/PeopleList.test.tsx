import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, useNavigate, useLocation } from 'react-router-dom';
import PeopleList from './PeopleList';
import { Swapi, listOfPeopleInit } from '../../services/Swapi';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

vi.mock('../../services/Swapi', () => ({
  Swapi: {
    getPeople: vi.fn(),
  },
  listOfPeopleInit: {
    count: 0,
    results: [],
  },
  PERSON_PARAM: 'person',
  PAGE_PARAM: 'page',
  ITEMS_PER_PAGE: 10,
}));

describe('PeopleList component', () => {
  const mockNavigate = vi.fn();
  const mockLocation = {
    search: '',
    pathname: '/people',
  };

  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    mockNavigate.mockClear();
    (Swapi.getPeople as jest.Mock).mockClear();
  });

  const mockQuery = 'skywalker';

  it('renders initial state correctly', () => {
    render(
      <MemoryRouter>
        <PeopleList query={mockQuery} />
      </MemoryRouter>,
    );
    expect(screen.queryByText(/People/i)).not.toBeInTheDocument();
  });

  it('shows loader while loading', async () => {
    (Swapi.getPeople as jest.Mock).mockResolvedValueOnce(listOfPeopleInit);

    render(
      <MemoryRouter>
        <PeopleList query={mockQuery} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    await waitFor(() => expect(Swapi.getPeople).toHaveBeenCalledTimes(1));
  });

  it('renders person details after loading', async () => {
    const peopleData = {
      count: 1,
      results: [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
    };
    (Swapi.getPeople as jest.Mock).mockResolvedValueOnce(peopleData);

    render(
      <MemoryRouter>
        <PeopleList query={mockQuery} />
      </MemoryRouter>,
    );

    await waitFor(() => expect(Swapi.getPeople).toHaveBeenCalledTimes(1));

    const nameElement = await screen.findByText('Luke Skywalker');
    expect(nameElement).toBeInTheDocument();

    expect(screen.getByText('172')).toBeInTheDocument();
    expect(screen.getByText('77')).toBeInTheDocument();
  });

  it('navigates to the correct page when a page number is clicked', async () => {
    const peopleData = {
      count: 1,
      results: [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
    };
    (Swapi.getPeople as jest.Mock).mockResolvedValueOnce(peopleData);

    render(
      <MemoryRouter>
        <PeopleList query={mockQuery} />
      </MemoryRouter>,
    );

    await waitFor(() => expect(Swapi.getPeople).toHaveBeenCalledTimes(1));

    const paginationButton = screen.getByText('1');
    paginationButton.click();

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith('?page=1', { replace: true }),
    );
  });

  it('displays "Not found" message when no results are found', async () => {
    const emptyData = {
      count: 0,
      results: [],
    };
    (Swapi.getPeople as jest.Mock).mockResolvedValueOnce(emptyData);

    render(
      <MemoryRouter>
        <PeopleList query={mockQuery} />
      </MemoryRouter>,
    );

    await waitFor(() => expect(Swapi.getPeople).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Not found')).toBeInTheDocument();
  });
});
