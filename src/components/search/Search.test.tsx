import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import searchReducer, { setSearchName } from '../../store/reducers/searchSlice';
import Search from './Search';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockDispatch = vi.fn();

vi.mock('react-redux', async (importOriginal) => {
  const module = await importOriginal<typeof import('react-redux')>();
  return {
    ...module,
    useDispatch: () => mockDispatch,
  };
});

describe('Search Component', () => {
  let mockRouterPush: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockRouterPush = vi.fn();
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      push: mockRouterPush,
      query: {},
    });
  });

  const renderWithStore = (initialState = '') => {
    const store = configureStore({
      reducer: {
        search: searchReducer,
      },
      preloadedState: {
        search: { searchName: initialState },
      },
    });

    return render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );
  };

  it('should render correctly', () => {
    renderWithStore('');
    expect(
      screen.getByPlaceholderText("Enter the person's name"),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should update search state on input change', () => {
    renderWithStore('');

    const input = screen.getByPlaceholderText(
      "Enter the person's name",
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Luke Skywalker' } });

    expect(input.value).toBe('Luke Skywalker');
  });

  it('should dispatch setSearchName and navigate on form submit', () => {
    renderWithStore('');

    const input = screen.getByPlaceholderText(
      "Enter the person's name",
    ) as HTMLInputElement;
    const form = screen.getByTestId('form');

    fireEvent.change(input, { target: { value: 'Luke' } });
    fireEvent.submit(form);

    expect(mockDispatch).toHaveBeenCalledWith(setSearchName('Luke'));
    expect(mockRouterPush).toHaveBeenCalledWith('/?search=Luke&page=1');
  });

  it('should initialize input with searchName from Redux store', () => {
    renderWithStore('Leia Organa');

    const input = screen.getByPlaceholderText(
      "Enter the person's name",
    ) as HTMLInputElement;
    expect(input.value).toBe('Leia Organa');
  });
});
