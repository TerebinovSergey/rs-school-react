import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { starWarsApi } from '../../services/starWarsApi';
import PeopleCard from './PeopleCard';
import { Person, PERSON_PARAM } from '../../services/types';
import store from '../../store.ts';
import { ReactElement } from 'react';

const renderWithProviders = (
  ui: ReactElement,
  { route = `/?${PERSON_PARAM}=1` } = {},
) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>,
  );
};

describe('PeopleCard', () => {
  beforeEach(() => {
    vi.spyOn(starWarsApi, 'useGetPersonQuery').mockReturnValue({
      data: {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
      } as Person,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', () => {
    renderWithProviders(<PeopleCard />);
  });

  it('displays loader while loading', () => {
    vi.spyOn(starWarsApi, 'useGetPersonQuery').mockReturnValue({
      data: null,
      isLoading: true,
      isFetching: true,
      isSuccess: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithProviders(<PeopleCard />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays person details after loading', async () => {
    renderWithProviders(<PeopleCard />);
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('172')).toBeInTheDocument();
      expect(screen.getByText('77')).toBeInTheDocument();
      expect(screen.getByText('fair')).toBeInTheDocument();
      expect(screen.getByText('blue')).toBeInTheDocument();
      expect(screen.getByText('19BBY')).toBeInTheDocument();
      expect(screen.getByText('male')).toBeInTheDocument();
    });
  });

  it('closes the card when close button is clicked', () => {
    renderWithProviders(<PeopleCard />);
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('Card')).not.toBeInTheDocument();
  });

  it('does not render if personId is not in search params', () => {
    renderWithProviders(<PeopleCard />, { route: '/' });
    expect(screen.queryByText('Card')).not.toBeInTheDocument();
  });
});
