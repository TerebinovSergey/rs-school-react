import { useState } from 'react';
import './App.css';
import PeopleList from './components/people-list/PeopleList.tsx';
import Search from './components/search/Search.tsx';
import ErrorBoundary from './components/error-boundary/ErrorBoundary.tsx';
import ErrorThrowing from './components/error-throwing/ErrorThrowing.tsx';
import { SearchStorage } from './storage/SearchStorage.ts';

function App() {
  const [searchQuery, setSearchQuery] = useState(SearchStorage.getQuery());

  const onSearch = (searchQuery: string): void => {
    setSearchQuery(searchQuery);
  };

  return (
    <ErrorBoundary>
      <Search onSubmit={onSearch} />
      <PeopleList query={searchQuery} />
      <ErrorThrowing />
    </ErrorBoundary>
  );
}

export default App;
