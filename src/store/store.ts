import { configureStore } from '@reduxjs/toolkit';
import { starWarsApi } from '../services/starWarsApi.ts';
import peopleReducer from './reducers/peopleSlice.ts';
import personReducer from './reducers/personSlice.ts';

const store = configureStore({
  reducer: {
    people: peopleReducer,
    person: personReducer,
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
