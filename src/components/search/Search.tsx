import { FormEvent } from 'react';
import styles from './Search.module.css';
import useSearchQuery from '../../hooks/useSearchQuery.ts';
import ErrorThrowing from '../error-throwing/ErrorThrowing.tsx';

interface Props {
  onSubmit: (query: string) => void;
}

function Search({ onSubmit }: Props) {
  const [queryHook, setQueryHook] = useSearchQuery();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryHook(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(queryHook);
  };

  return (
    <form className={styles.formSearch} onSubmit={handleSubmit}>
      <input
        className={styles.formSearch__input}
        type="text"
        value={queryHook}
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
