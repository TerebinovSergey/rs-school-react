import { Component } from 'react';
import './App.css';
import NewsList from './components/news-list/NewsList.tsx';
import Search from './components/search/Search.tsx';
import ErrorBoundary from './components/error-boundary/ErrorBoundary.tsx';
import ErrorThrowing from './components/error-throwing/ErrorThrowing.tsx';
import { SearchStorage } from './storage/SearchStorage.ts';

class App extends Component {
  state = {
    serachQuery: SearchStorage.getQuery(),
    makeMistake: false,
  };

  onSearch = (serachQuery: string): void => {
    this.setState({ serachQuery });
  };

  render() {
    return (
      <ErrorBoundary>
        <>
          <Search onSubmit={this.onSearch} />
          <NewsList query={this.state.serachQuery} />
          <ErrorThrowing />
        </>
      </ErrorBoundary>
    );
  }
}

export default App;
