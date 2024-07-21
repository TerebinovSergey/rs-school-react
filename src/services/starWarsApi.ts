import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BASE_PATH,
  ListOfPeople,
  PAGE_PARAM,
  Person,
  SEARCH_PARAM,
} from './types.ts';

export const starWarsApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_PATH }),
  endpoints: (builder) => ({
    getPeople: builder.query<ListOfPeople, { query: string; page: number }>({
      query: ({ query, page }) =>
        `people/?${PAGE_PARAM}=${page}&${SEARCH_PARAM}=${query}`,
    }),
    getPerson: builder.query<Person, number>({
      query: (id) => `people/${id}`,
    }),
  }),
});
