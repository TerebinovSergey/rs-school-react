import { useEffect, useState } from 'react';
import Title from '../title/Title.tsx';
import PeopleItem from '../people-item/PeopleItem.tsx';
import styles from './PeopleList.module.css';
import Loader from '../loader/Loader.tsx';
import { listOfPeopleInit, Swapi } from '../../services/Swapi.ts';

type Props = {
  query: string;
};

function PeopleList({ query }: Props) {
  const [listOfPeople, setListOfPeople] = useState(listOfPeopleInit);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoad(true);
      const listOfPeople = await Swapi.getPeople(query);
      setListOfPeople(listOfPeople);
      setIsLoad(false);
    };
    loadPeople();
  }, [query]);

  if (isLoad) {
    return <Loader />;
  }

  return (
    <div>
      <Title title="People" />
      <ul className={styles.peopleList}>
        {listOfPeople.results.map(({ name, height, url, mass }) => {
          return (
            <li className={styles.people} key={url}>
              {' '}
              <PeopleItem
                name={name ?? ''}
                height={height ?? ''}
                mass={mass ?? ''}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PeopleList;
