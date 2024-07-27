import { useState } from 'react';
import PeopleList from '../../components/people-list/PeopleList';
import Search from '../../components/search/Search.tsx';
import { SearchStorage } from '../../storage/SearchStorage.ts';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css';
import { PagePaths } from '../../utils/utils.ts';
import { PERSON_PARAM } from '../../services/types.ts';
import SavePeople from '../../components/save-people/SavePeople.tsx';

function MainPage() {
  const [searchQuery, setSearchQuery] = useState(SearchStorage.getQuery());
  const navigate = useNavigate();

  const onSearch = (searchQuery: string): void => {
    setSearchQuery(searchQuery);
  };

  const handleClose = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(PERSON_PARAM);
    navigate(`${PagePaths.Main}?${searchParams.toString()}`);
  };

  return (
    <div className={styles.mainPage}>
      <Search onSubmit={onSearch} />
      <section className={styles.panelWrapper}>
        <div onClick={handleClose} className={styles.leftPanel}>
          <PeopleList query={searchQuery} />
        </div>
        <div className={styles.rightPanel}>
          <Outlet />
          <SavePeople />
        </div>
      </section>
    </div>
  );
}

export default MainPage;
