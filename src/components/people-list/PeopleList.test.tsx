import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import PeopleList from './PeopleList';
import { starWarsApi } from '../../services/starWarsApi';
import store from '../../store/store';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

interface RenderWithProvidersOptions {
  route?: string;
}

const renderWithProviders = (
  ui: React.ReactElement,
  { route = '/' }: RenderWithProvidersOptions = {},
) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>,
  );
};

describe('PeopleList', () => {
  const mockNavigate = vi.fn();
  const mockLocation = {
    search: '/?page=1',
    pathname: '/',
  };

  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    mockNavigate.mockClear();
    vi.clearAllMocks();
  });

  it('shows loader while loading', () => {
    vi.spyOn(starWarsApi, 'useGetPeopleQuery').mockReturnValue({
      data: null,
      isLoading: true,
      isFetching: true,
      isSuccess: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithProviders(<PeopleList query="Luke" />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays "Not found" message when no results are found', () => {
    vi.spyOn(starWarsApi, 'useGetPeopleQuery').mockReturnValue({
      data: { count: 0, results: [] },
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithProviders(<PeopleList query="tttttt" />);

    expect(screen.getByText('Not found')).toBeInTheDocument();
  });

  it('renders a list of people items after loading', async () => {
    const mockData = {
      count: 1,
      results: [
        { name: 'Luke Skywalker', height: '172', mass: '77', url: '1' },
      ],
    };

    vi.spyOn(starWarsApi, 'useGetPeopleQuery').mockReturnValue({
      data: mockData,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithProviders(<PeopleList query="Luke" />);

    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument(),
    );
  });

  it('handles page changes correctly', () => {
    const mockData = {
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

    vi.spyOn(starWarsApi, 'useGetPeopleQuery').mockReturnValue({
      data: mockData,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithProviders(<PeopleList query="Luke" />);

    fireEvent.click(screen.getByText('1'));
    expect(mockNavigate).toHaveBeenCalledWith('?page=1', { replace: true });
  });
});
