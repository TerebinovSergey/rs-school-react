/* import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import personReducer, { removePerson } from '../../store/reducers/personSlice';
import PeopleCard from './PeopleCard';
import { useRouter } from 'next/router';
import { PagePaths } from '../../utils/utils';

// Мокаем useRouter из next/router
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('PeopleCard Component', () => {
  let mockRouterPush: vi.Mock;

  beforeEach(() => {
    mockRouterPush = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({
      push: mockRouterPush,
      query: {},
    });
  });

  const renderWithStore = (initialState = {}) => {
    const store = configureStore({
      reducer: {
        person: personReducer,
      },
      preloadedState: {
        person: { person: initialState },
      },
    });

    return render(
      <Provider store={store}>
        <PeopleCard />
      </Provider>,
    );
  };

  it('should dispatch removePerson on mount', () => {
    const spyDispatch = vi.spyOn(personReducer, 'removePerson');
    renderWithStore({ name: 'Luke Skywalker' });

    expect(spyDispatch).toHaveBeenCalled();
  });

  it('should not render anything if person name and url are not provided', () => {
    renderWithStore({});

    expect(screen.queryByText('Card')).toBeNull();
  });

  it('should render person details if person is available', () => {
    renderWithStore({
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    });

    expect(screen.getByText('Card')).toBeInTheDocument();
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should call handleClose when Close button is clicked', () => {
    const spyDispatch = vi.spyOn(personReducer, 'removePerson');
    renderWithStore({ name: 'Luke Skywalker' });

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(spyDispatch).toHaveBeenCalledTimes(2);
    expect(mockRouterPush).toHaveBeenCalledWith(
      expect.stringContaining(PagePaths.Main),
    );
  });
});
 */
