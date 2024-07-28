import { useEffect, useState } from 'react';
import { SearchStorage } from '../storage/SearchStorage.ts';

function useSearchQuery(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
] {
  const [query, setQuery] = useState(SearchStorage.getQuery());

  useEffect(() => {
    SearchStorage.saveQuery(query);
  }, [query]);

  return [query, setQuery];
}

export default useSearchQuery;
