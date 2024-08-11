import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MainPage from './index.tsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import peopleReducer from '../store/reducers/peopleSlice.ts';
import personReducer from '../store/reducers/personSlice.ts';
import selectedPeopleReducer from '../store/reducers/selectedPeopleSlice.ts';
import searchReducer from '../store/reducers/searchSlice.ts';
import { starWarsApi } from '../services/starWarsApi.ts';
import { RootState } from '../store/store.ts';
import { IPerson } from '../models/IPerson.ts';

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

const mockStore = (initialState: Partial<RootState>) => {
  const rootReducer = combineReducers({
    selectedPeople: selectedPeopleReducer,
    people: peopleReducer,
    person: personReducer,
    search: searchReducer,
    [starWarsApi.reducerPath]: (state = {}) => state,
  });
  return createStore(rootReducer, initialState);
};

describe('MainPage component', () => {
  //const routerPushMock = vi.fn();

  beforeEach(() => {
    // Инициализация мока для useRouter
    //const routerPushMock = vi.fn();

    // Мокаутирование useRouter
    vi.mock('next/router', () => ({
      useRouter: () => ({
        query: {},
      }),
    }));

    // Сброс состояния модулей и моков
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('renders MainPage with child components', () => {
    const store = mockStore({
      search: { searchName: '' },
      //person: { personList: mockPersonList },
      selectedPeople: { selectedPeople: [] },
    });

    render(
      <Provider store={store}>
        <MainPage personList={mockPersonList} totalCount={1} />,
      </Provider>,
    );

    // Проверка рендеринга дочерних компонентов
    expect(screen.getByText('People')).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });
});
