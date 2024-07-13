import { useEffect, useRef, useState } from 'react';
import { SearchStorage } from '../storage/SearchStorage.ts';

export default function useSearchQuery(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
] {
  const [query, setQuery] = useState(SearchStorage.getQuery());
  const queryRef = useRef(query);

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  useEffect(() => {
    return () => {
      SearchStorage.saveQuery(query);
    };
  });

  return [query, setQuery];
}
