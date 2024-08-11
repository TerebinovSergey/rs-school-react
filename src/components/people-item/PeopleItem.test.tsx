import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import PeopleItem from './PeopleItem';
import { IPeople } from '../../models/IPeople';
import { configureStore } from '@reduxjs/toolkit';
import { starWarsApi } from '../../services/starWarsApi';
import selectedPersonReducer from '../../store/reducers/selectedPeopleSlice';
import peopleReducer from '../../store/reducers/peopleSlice';
import personReducer from '../../store/reducers/personSlice';
import searchReducer from '../../store/reducers/searchSlice';

const store = configureStore({
  reducer: {
    selectedPeople: selectedPersonReducer,
    people: peopleReducer,
    person: personReducer,
    search: searchReducer,
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

describe('PeopleItem component', () => {
  const mockPeople: IPeople = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    url: '',
  };

  it('renders initial state correctly', () => {
    render(
      <Provider store={store}>
        <PeopleItem people={mockPeople} />
      </Provider>,
    );
    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText(/Height:/)).toBeInTheDocument();
    expect(screen.getByText(/Mass:/)).toBeInTheDocument();
  });

  it('displays the correct name', () => {
    render(
      <Provider store={store}>
        <PeopleItem people={mockPeople} />
      </Provider>,
    );
    expect(screen.getByText(mockPeople.name)).toBeInTheDocument();
  });

  it('displays the correct height', () => {
    render(
      <Provider store={store}>
        <PeopleItem people={mockPeople} />
      </Provider>,
    );
    expect(screen.getByText(mockPeople.height)).toBeInTheDocument();
  });

  it('displays the correct mass', () => {
    render(
      <Provider store={store}>
        <PeopleItem people={mockPeople} />
      </Provider>,
    );
    expect(screen.getByText(mockPeople.mass)).toBeInTheDocument();
  });
});
