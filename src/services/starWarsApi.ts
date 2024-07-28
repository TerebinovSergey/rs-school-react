import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_PATH, PAGE_PARAM, SEARCH_PARAM } from './types.ts';
import { IListOfPeople } from '../models/IListOfPeople.ts';
import { IPerson } from '../models/IPerson.ts';
import { setPeople } from '../store/reducers/peopleSlice.ts';
import { setPerson } from '../store/reducers/personSlice.ts';

export const starWarsApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_PATH }),
  endpoints: (builder) => ({
    getPeople: builder.query<IListOfPeople, { query: string; page: number }>({
      query: ({ query, page }) =>
        `people/?${PAGE_PARAM}=${page}&${SEARCH_PARAM}=${query}`,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPeople(data.results));
        } catch (error) {
          console.error('Failed to fetch people:', error);
        }
      },
    }),
    getPerson: builder.query<IPerson, number>({
      query: (id) => `people/${id}`,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPerson(data));
        } catch (error) {
          console.error('Failed to fetch people:', error);
        }
      },
    }),
  }),
});
