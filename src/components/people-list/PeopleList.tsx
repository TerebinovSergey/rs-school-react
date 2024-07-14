import { useEffect, useState } from 'react';
import Title from '../title/Title.tsx';
import PeopleItem from '../people-item/PeopleItem.tsx';
import styles from './PeopleList.module.css';
import Loader from '../loader/Loader.tsx';
import {
  listOfPeopleInit,
  Swapi,
  ITEMS_PER_PAGE,
} from '../../services/Swapi.ts';
import Pagination from '../pagination/Pagination.tsx';
import { useNavigate, useLocation } from 'react-router-dom';

type Props = {
  query: string;
};

function PeopleList({ query }: Props) {
  const [listOfPeople, setListOfPeople] = useState(listOfPeopleInit);
  const [isLoad, setIsLoad] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoad(true);
      const listOfPeople = await Swapi.getPeople(query, currentPage);

      if (!listOfPeople.count) {
        navigate(`?page=1`);
        setCurrentPage(1);
        return;
      }
      setListOfPeople(listOfPeople);
      setTotalItems(listOfPeople.count);
      setIsLoad(false);
    };
    loadPeople();
  }, [query, currentPage, navigate]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);
    if (page !== Number(query.get('page'))) {
      navigate(`?page=${page}`, { replace: true });
    }
    setCurrentPage(page);
  }, [location.search, navigate]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoad) {
    return <Loader />;
  }

  return (
    <>
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
      <Pagination
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default PeopleList;
