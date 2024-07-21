import { useEffect, useState, MouseEvent } from 'react';
import Title from '../title/Title.tsx';
import PeopleItem from '../people-item/PeopleItem.tsx';
import styles from './PeopleList.module.css';
import Loader from '../loader/Loader.tsx';
import {
  listOfPeopleInit,
  Swapi,
  ITEMS_PER_PAGE,
  PERSON_PARAM,
  PAGE_PARAM,
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
      if (listOfPeople.count === undefined) {
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
    const page = parseInt(query.get(PAGE_PARAM) || '1', 10);
    if (page !== Number(query.get(PAGE_PARAM))) {
      navigate(`?page=${page}`, { replace: true });
    }
    setCurrentPage(page);
  }, [location.search, navigate]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePersonClick = (event: MouseEvent<HTMLLIElement>, url: string) => {
    event.stopPropagation();
    const pathUrl = url.split('/');
    const id = pathUrl[pathUrl.length - 2];
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(PERSON_PARAM, id);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  if (isLoad) {
    return <Loader />;
  }

  if (listOfPeople.count === undefined || listOfPeople.count === 0) {
    return <h3>Not found</h3>;
  }

  return (
    <>
      <Title title="People" />
      <ul className={styles.peopleList}>
        {listOfPeople.results.map(({ name, height, url, mass }) => {
          return (
            <li
              onClick={(event) => handlePersonClick(event, url)}
              className={styles.people}
              key={url}
            >
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
