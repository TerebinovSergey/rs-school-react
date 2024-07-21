import { useEffect, useState, MouseEvent } from 'react';
import Title from '../title/Title.tsx';
import PeopleItem from '../people-item/PeopleItem.tsx';
import styles from './PeopleList.module.css';
import Loader from '../loader/Loader.tsx';
import {
  ITEMS_PER_PAGE,
  PERSON_PARAM,
  PAGE_PARAM,
} from '../../services/types.ts';
import Pagination from '../pagination/Pagination.tsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { starWarsApi } from '../../services/starWarsApi.ts';

type Props = {
  query: string;
};

function PeopleList({ query }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { data, error, isLoading } = starWarsApi.useGetPeopleQuery({
    query,
    page: currentPage,
  });

  useEffect(() => {
    if (!data || data.count === undefined || error !== undefined) {
      navigate(`?page=1`);
      setCurrentPage(1);
      return;
    }
  }, [data, error, navigate]);

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

  if (isLoading) {
    return <Loader />;
  }

  if (!data || data.count === 0) {
    return <h3>Not found</h3>;
  }

  return (
    <>
      <Title title="People" />
      <ul className={styles.peopleList}>
        {data.results.map(({ name, height, url, mass }) => {
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
        totalItems={data.count}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default PeopleList;
