import { FormEvent, useState } from 'react';
import styles from './Search.module.css';
import ErrorThrowing from '../error-throwing/ErrorThrowing.tsx';
import { RootState } from '../../store/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchName } from '../../store/reducers/searchSlice.ts';
import { useRouter } from 'next/router';

function Search() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchName = useSelector((state: RootState) => state.search.searchName);
  const [search, setSearch] = useState(searchName);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setSearchName(search.trim()));
    router.push(`/?search=${search.trim()}&page=1`);
  };

  return (
    <form
      data-testid="form"
      className={styles.formSearch}
      onSubmit={handleSubmit}
    >
      <input
        className={styles.formSearch__input}
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Enter the person's name"
      />
      <button className={styles.formSearch__button} type="submit">
        Search
      </button>
      <ErrorThrowing />
    </form>
  );
}

export default Search;
