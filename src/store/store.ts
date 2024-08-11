import { configureStore } from '@reduxjs/toolkit';
import { starWarsApi } from '../services/starWarsApi.ts';
import peopleReducer from './reducers/peopleSlice.ts';
import personReducer from './reducers/personSlice.ts';
import selectedPersonReducer from './reducers/selectedPeopleSlice.ts';
import searchReducer from './reducers/searchSlice.ts';
import { createWrapper } from 'next-redux-wrapper';

const store = () =>
  configureStore({
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

export type RootState = ReturnType<ReturnType<typeof store>['getState']>;
export type AppDispatch = ReturnType<typeof store>['dispatch'];
export const wrapper = createWrapper(store, { debug: true });
