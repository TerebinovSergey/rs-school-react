import { Component } from 'react';
import './App.css';
import PeopleList from './components/people-list/PeopleList.tsx';
import Search from './components/search/Search.tsx';
import ErrorBoundary from './components/error-boundary/ErrorBoundary.tsx';
import ErrorThrowing from './components/error-throwing/ErrorThrowing.tsx';
import { SearchStorage } from './storage/SearchStorage.ts';

class App extends Component {
  state = {
    searchQuery: SearchStorage.getQuery(),
    makeMistake: false,
  };

  onSearch = (searchQuery: string): void => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <ErrorBoundary>
        <Search onSubmit={this.onSearch} />
        <PeopleList query={this.state.searchQuery} />
        <ErrorThrowing />
      </ErrorBoundary>
    );
  }
}

export default App;
