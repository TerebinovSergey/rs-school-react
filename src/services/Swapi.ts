const BASE_PATH = 'https://swapi.dev/api/people/';
const SEARCH_PARAM = 'search=';
const PAGE_PARAM = 'page=';

export type People = {
  name: string;
  height: string;
  mass: string;
  url: string;
};

export type ListOfPeople = {
  results: People[];
  count: number;
  next: string | null;
  previous: string | null;
};

export const listOfPeopleInit: ListOfPeople = {
  results: [],
  count: 0,
  next: null,
  previous: null,
};

export class Swapi {
  static async getPeople(query: string) {
    try {
      const response = await fetch(
        `${BASE_PATH}?${PAGE_PARAM}1&${SEARCH_PARAM}${query}`,
      );
      const people: ListOfPeople = await response.json();
      return people;
    } catch (error: unknown) {
      console.log(error);
      return listOfPeopleInit;
    }
  }
}