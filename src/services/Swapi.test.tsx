import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Swapi, listOfPeopleInit, personInit } from './Swapi';
import fetchMock from 'fetch-mock';

const BASE_PATH = 'https://swapi.dev/api/people/';
const SEARCH_PARAM = 'search=';
const PAGE_PARAM = 'page';

describe('Swapi', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('getPeople', () => {
    it('fetches a list of people successfully', async () => {
      const mockResponse = {
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            url: `${BASE_PATH}1/`,
          },
        ],
        count: 1,
        next: null,
        previous: null,
      };

      fetchMock.get(`${BASE_PATH}?${PAGE_PARAM}=1&${SEARCH_PARAM}Luke`, {
        status: 200,
        body: mockResponse,
      });

      const people = await Swapi.getPeople('Luke', 1);
      expect(people).toEqual(mockResponse);
    });

    it('returns listOfPeopleInit on fetch error', async () => {
      fetchMock.get(`${BASE_PATH}?${PAGE_PARAM}=1&${SEARCH_PARAM}Luke`, 500);

      const people = await Swapi.getPeople('Luke', 1);
      expect(people).toEqual(listOfPeopleInit);
    });
  });

  describe('getPerson', () => {
    it('fetches a person successfully', async () => {
      const mockResponse = {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'white',
        eye_color: 'blue',
        birth_year: 'test',
        gender: 'male',
        url: `${BASE_PATH}1/`,
      };

      fetchMock.get(`${BASE_PATH}1`, {
        status: 200,
        body: mockResponse,
      });

      const person = await Swapi.getPerson(1);
      expect(person).toEqual(mockResponse);
    });

    it('returns personInit on fetch error', async () => {
      fetchMock.get(`${BASE_PATH}1`, 500);

      const person = await Swapi.getPerson(1);
      expect(person).toEqual(personInit);
    });
  });
});
