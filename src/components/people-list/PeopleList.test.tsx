import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PeopleList from './PeopleList.tsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import personReducer from '../../store/reducers/personSlice.ts';
import searchReducer from '../../store/reducers/searchSlice.ts';
import selectedPeopleReducer from '../../store/reducers/selectedPeopleSlice.ts';
import { starWarsApi } from '../../services/starWarsApi.ts';
import { IPerson } from '../../models/IPerson.ts';

const mockPersonList: IPerson[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
  },
];

const mockStore = (initialState = {}) => {
  const rootReducer = combineReducers({
    person: personReducer,
    search: searchReducer,
    selectedPeople: selectedPeopleReducer,
    [starWarsApi.reducerPath]: (state = {}) => state,
  });
  return createStore(rootReducer, initialState);
};

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
  }),
}));

describe('PeopleList Component', () => {
  it('renders "Not found" when personList is an empty array', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <PeopleList personList={[]} totalCount={0} />
      </Provider>,
    );

    expect(screen.getByText('Not found')).toBeInTheDocument();
  });

  it('renders list of people when personList contains data', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <PeopleList personList={mockPersonList} totalCount={1} />
      </Provider>,
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });
});
