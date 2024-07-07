import { Component, FormEvent } from 'react';
import { SearchStorage } from '../../storage/SearchStorage';
import styles from './Search.module.css';

interface SearchProps {
  onSubmit: (query: string) => void;
}

class Search extends Component<SearchProps> {
  state = {
    query: SearchStorage.getQuery(),
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { query } = this.state;
    SearchStorage.saveQuery(query);
    this.props.onSubmit(query);
  };

  render() {
    return (
      <form className={styles.formSearch} onSubmit={this.handleSubmit}>
        <input
          className={styles.formSearch__input}
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Enter your request..."
        />
        <button className={styles.formSearch__button} type="submit">
          Search
        </button>
      </form>
    );
  }
}

export default Search;
