import { IListOfPeople } from '../models/IListOfPeople';
import { IPerson } from '../models/IPerson';

export const BASE_PATH = 'https://swapi.dev/api/';
export const SEARCH_PARAM = 'search';
export const PAGE_PARAM = 'page';
export const PERSON_PARAM = 'person';
export const ITEMS_PER_PAGE = 10;

export const listOfPeopleInit: IListOfPeople = {
  results: [],
  count: 0,
  next: null,
  previous: null,
};

export const personInit: IPerson = {
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
