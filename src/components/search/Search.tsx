import { FormEvent, useState } from 'react';
import { SearchStorage } from '../../storage/SearchStorage';
import styles from './Search.module.css';

interface Props {
  onSubmit: (query: string) => void;
}

function Search({ onSubmit }: Props) {
  const [query, setQuery] = useState(SearchStorage.getQuery());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    SearchStorage.saveQuery(query);
    onSubmit(query);
  };

  return (
    <form className={styles.formSearch} onSubmit={handleSubmit}>
      <input
        className={styles.formSearch__input}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter the person's name"
      />
      <button className={styles.formSearch__button} type="submit">
        Search
      </button>
    </form>
  );
}

export default Search;
