import { GetServerSidePropsContext } from 'next';
import { IListOfPeople } from '../models/IListOfPeople';
import { IPerson } from '../models/IPerson';

export const fetchPersons = async (context: GetServerSidePropsContext) => {
  const { search = '', page = 1 } = context.query;

  const response = await fetch(
    `https://swapi.dev/api/people/?search=${search}&page=${page}`,
  );
  const peopleList: IListOfPeople = await response.json();
  const personList = [];

  for (const person of peopleList.results) {
    const response = await fetch(person.url);
    const personData: IPerson = await response.json();
    personList.push(personData);
  }

  return { totalCount: peopleList.count, personList };
};
