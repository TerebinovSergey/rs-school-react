import ErrorBoundary from './error-boundary/ErrorBoundary.tsx';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../pages/404/NotFoundPage.tsx';
import { PagePaths } from '../utils/utils.ts';
import MainPage from '../pages/main-page/MainPage.tsx';
import PeopleCard from './people-card/PeopleCard.tsx';

function AppRouter() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path={PagePaths.Main} element={<MainPage />}>
          <Route path={PagePaths.Main} element={<PeopleCard />} />
        </Route>
        <Route path={PagePaths.NotFound} element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default AppRouter;
