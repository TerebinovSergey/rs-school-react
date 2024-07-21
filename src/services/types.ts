export const BASE_PATH = 'https://swapi.dev/api/';
export const SEARCH_PARAM = 'search';
export const PAGE_PARAM = 'page';
export const PERSON_PARAM = 'person';
export const ITEMS_PER_PAGE = 10;

interface People {
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

export interface Person extends People {
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
