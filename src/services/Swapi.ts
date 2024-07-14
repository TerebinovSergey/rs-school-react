const BASE_PATH = 'https://swapi.dev/api/people/';
const SEARCH_PARAM = 'search=';
export const PAGE_PARAM = 'page';
export const PERSON_PARAM = 'person';
export const ITEMS_PER_PAGE = 10;

export interface People {
  name: string;
  height: string;
  mass: string;
  url: string;
}

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

interface Person extends People {
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export const personInit: Person = {
  name: '',
  height: '',
  mass: '',
  url: '',
  hair_color: '',
  skin_color: '',
  eye_color: '',
  birth_year: '',
  gender: '',
};

export class Swapi {
  static async getPeople(query: string, page: number) {
    try {
      const response = await fetch(
        `${BASE_PATH}?${PAGE_PARAM}=${page}&${SEARCH_PARAM}${query}`,
      );
      const people: ListOfPeople = await response.json();
      return people;
    } catch (error: unknown) {
      console.log(error);
      return listOfPeopleInit;
    }
  }

  static async getPerson(id: number) {
    try {
      const response = await fetch(`${BASE_PATH}${id}`);
      const person: Person = await response.json();
      return person;
    } catch (error: unknown) {
      console.log(error);
      return personInit;
    }
  }
}
