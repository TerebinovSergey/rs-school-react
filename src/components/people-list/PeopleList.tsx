import { useEffect, useState, MouseEvent } from 'react';
import Title from '../title/Title.tsx';
import PeopleItem from '../people-item/PeopleItem.tsx';
import styles from './PeopleList.module.css';
import Loader from '../loader/Loader.tsx';
import { ITEMS_PER_PAGE, PERSON_PARAM } from '../../services/types.ts';
import Pagination from '../pagination/Pagination.tsx';
import { useRouter } from 'next/router';
import { PeopleListProps } from '../../types/props.ts';
import { RootState } from '../../store/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { IPerson } from '../../models/IPerson.ts';
import { setPerson } from '../../store/reducers/personSlice.ts';

function PeopleList({ personList, totalCount }: PeopleListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const search = useSelector((state: RootState) => state.search.searchName);
  const router = useRouter();
  const dispatch = useDispatch();

  const isLoading = !Array.isArray(personList);

  useEffect(() => {
    if (!personList) {
      router.push(`/?search=${search}&page=1`);
      setCurrentPage(1);
    }
  }, [personList, router, search]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/?search=${search}&page=${page}`);
  };

  const handlePersonClick = (
    event: MouseEvent<HTMLLIElement>,
    person: IPerson,
  ) => {
    event.stopPropagation();
    const pathUrl = person.url.split('/');
    const id = pathUrl[pathUrl.length - 2];
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(PERSON_PARAM, id);
    router.push(`${location.pathname}?${searchParams.toString()}`);
    dispatch(setPerson(person));
  };

  let content: JSX.Element;

  if (isLoading) {
    content = <Loader />;
  } else if (!personList || personList.length === 0) {
    content = <h3>Not found</h3>;
  } else {
    return (
      <div className={styles.wrapperPeopleList}>
        <div>
          <Title title="People" />
          <ul className={styles.peopleList}>
            {personList.map((people) => {
              return (
                <li
                  onClick={(event) => handlePersonClick(event, people)}
                  className={styles.people}
                  key={people.url}
                >
                  {' '}
                  <PeopleItem people={people} />
                </li>
              );
            })}
          </ul>
        </div>

        <Pagination
          totalItems={totalCount}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }

  return (
    <>
      <Title title="People" />
      {content}
    </>
  );
}

export default PeopleList;
