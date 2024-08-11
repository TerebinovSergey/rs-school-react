/* import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PeopleList from './PeopleList';
import { RootState } from '../../store/store';
import { setPerson } from '../../store/reducers/personSlice';
import { IPerson } from '../../models/IPerson';
import selectedPeopleReducer from '../../store/reducers/selectedPeopleSlice';
import peopleReducer from '../../store/reducers/peopleSlice';
import personReducer from '../../store/reducers/personSlice';
import searchReducer from '../../store/reducers/searchSlice';
import { starWarsApi } from '../../services/starWarsApi';
import { PERSON_PARAM } from '../../services/types';

// Мок данных
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
  {
    name: 'C-3PO',
    height: '167',
    mass: '75',
    hair_color: 'n/a',
    skin_color: 'gold',
    eye_color: 'yellow',
    birth_year: '112BBY',
    gender: 'n/a',
    url: 'https://swapi.dev/api/people/2/',
  },
];

const mockReducer = (state = {}) => state;

const rootReducer = combineReducers({
  selectedPeople: selectedPeopleReducer,
  people: peopleReducer,
  person: personReducer,
  search: searchReducer,
  [starWarsApi.reducerPath]: mockReducer,
});

const mockStore = (initialState: Partial<RootState>) =>
  createStore(rootReducer, initialState);

describe('PeopleList component', () => {
  let routerPushMock: vi.Mock;

  beforeEach(() => {
    // Инициализация мока для useRouter
    routerPushMock = vi.fn();

    // Мокаутирование useRouter
    vi.mock('next/router', () => ({
      useRouter: () => ({
        push: routerPushMock,
        query: {},
      }),
    }));

    // Сброс состояния модулей и моков
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('displays "Not found" message when personList is empty', () => {
    const store = mockStore({ search: { searchName: '' } });

    render(
      <Provider store={store}>
        <PeopleList personList={[]} totalCount={0} />
      </Provider>,
    );

    expect(screen.getByText('Not found')).toBeInTheDocument();
  });

  it('renders people list correctly', () => {
    const store = mockStore({ search: { searchName: '' } });

    render(
      <Provider store={store}>
        <PeopleList personList={mockPersonList} totalCount={2} />
      </Provider>,
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('calls handlePageChange on pagination click', () => {
    const store = mockStore({ search: { searchName: '' } });

    render(
      <Provider store={store}>
        <PeopleList personList={mockPersonList} totalCount={10} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('1'));
    expect(routerPushMock).toHaveBeenCalledWith('/?search=&page=1');
  });

  it('dispatches setPerson action on person click', () => {
    const dispatchMock = vi.fn();
    const store = mockStore({ search: { searchName: '' } });
    vi.spyOn(store, 'dispatch').mockImplementation(dispatchMock);

    render(
      <Provider store={store}>
        <PeopleList personList={mockPersonList} totalCount={2} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(dispatchMock).toHaveBeenCalledWith(setPerson(mockPersonList[0]));
    expect(routerPushMock).toHaveBeenCalledWith(
      `${location.pathname}?${PERSON_PARAM}=luke`,
    );
  });
});
 */
