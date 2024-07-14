import { useState } from 'react';
import PeopleList from './people-list/PeopleList.tsx';
import Search from './search/Search.tsx';
import ErrorBoundary from './error-boundary/ErrorBoundary.tsx';
import ErrorThrowing from './error-throwing/ErrorThrowing.tsx';
import { SearchStorage } from '../storage/SearchStorage.ts';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../pages/404/NotFoundPage.tsx';
import { PagePaths } from '../utils/utils.ts';

function AppRouter() {
  const [searchQuery, setSearchQuery] = useState(SearchStorage.getQuery());

  const onSearch = (searchQuery: string): void => {
    setSearchQuery(searchQuery);
  };

  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path={PagePaths.Main}
          element={
            <>
              <Search onSubmit={onSearch} />
              <PeopleList query={searchQuery} />
              <ErrorThrowing />
            </>
          }
        />
        <Route path={PagePaths.NotFound} element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default AppRouter;
