import { FC } from 'react';
import PeopleList from '../components/people-list/PeopleList';
import Search from '../components/search/Search.tsx';
import styles from '../styles/MainPage.module.css';
import { PagePaths } from '../utils/utils.ts';
import { PERSON_PARAM } from '../services/types.ts';
import SavePeople from '../components/save-people/SavePeople.tsx';
import { useRouter } from 'next/router';
import { MainPageProps } from '../types/props.ts';
import PeopleCard from '../components/people-card/PeopleCard.tsx';
import { GetServerSideProps } from 'next';
import { fetchPersons } from '../api/fetchPersons.ts';

export const getServerSideProps: GetServerSideProps<MainPageProps> = async (
  context,
) => {
  const persons = await fetchPersons(context);

  return { props: persons };
};

const MainPage: FC<MainPageProps> = ({ personList, totalCount }) => {
  const router = useRouter();

  const handleClose = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(PERSON_PARAM);
    router.push(`${PagePaths.Main}?${searchParams.toString()}`);
  };

  return (
    <div className={styles.mainPage}>
      <Search />
      <section className={styles.panelWrapper}>
        <div onClick={handleClose} className={styles.leftPanel}>
          <PeopleList personList={personList} totalCount={totalCount} />
        </div>
        <div className={styles.rightPanel}>
          <PeopleCard />
          <SavePeople />
        </div>
      </section>
    </div>
  );
};

export default MainPage;
