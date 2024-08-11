import { IPerson } from '../models/IPerson';

export type MainPageProps = {
  totalCount: number;
  personList: IPerson[];
};

export type PeopleListProps = {
  personList: IPerson[];
  totalCount: number;
};
