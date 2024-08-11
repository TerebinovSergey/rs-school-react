import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPersons } from '../api/fetchPersons';
import { IPerson } from '../models/IPerson';
import { IListOfPeople } from '../models/IListOfPeople';
import { GetServerSidePropsContext } from 'next';

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

const mockPeopleList: IListOfPeople = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      url: 'https://swapi.dev/api/people/1/',
    },
  ],
};

describe('fetchPersons function', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('successfully fetches and processes people data', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: async () => mockPeopleList,
      } as Response)
      .mockResolvedValueOnce({
        json: async () => mockPersonList[0],
      } as Response);

    const context = {
      query: {
        search: 'Luke',
        page: '1',
      },
    } as unknown as GetServerSidePropsContext;

    const result = await fetchPersons(context);

    expect(result).toEqual({
      totalCount: 1,
      personList: mockPersonList,
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/?search=Luke&page=1',
    );
    expect(global.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/1/',
    );
  });

  it('handles errors in fetching person details', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: async () => mockPeopleList,
      } as Response)
      .mockRejectedValueOnce(new Error('Failed to fetch'));

    const context = {
      query: {
        search: 'Luke',
        page: '1',
      },
    } as unknown as GetServerSidePropsContext;

    await expect(fetchPersons(context)).rejects.toThrow('Failed to fetch');

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/?search=Luke&page=1',
    );
    expect(global.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/1/',
    );
  });
});
