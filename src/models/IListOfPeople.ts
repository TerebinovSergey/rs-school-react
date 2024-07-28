import { IPeople } from './IPeople';

export interface IListOfPeople {
  results: IPeople[];
  count: number;
  next: string | null;
  previous: string | null;
}
