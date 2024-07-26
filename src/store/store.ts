import { configureStore } from '@reduxjs/toolkit';
import { starWarsApi } from '../services/starWarsApi.ts';
import peopleReducer from './reducers/peopleSlice.ts';
import personReducer from './reducers/personSlice.ts';
import selectedPersonReducer from './reducers/selectedPeopleSlice.ts';

const store = configureStore({
  reducer: {
    selectedPeople: selectedPersonReducer,
    people: peopleReducer,
    person: personReducer,
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
