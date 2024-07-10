const KEY_SEARCH = 'search';

export class SearchStorage {
  static getQuery(): string {
    return localStorage.getItem(KEY_SEARCH) ?? '';
  }

  static saveQuery(query: string) {
    localStorage.setItem(KEY_SEARCH, query.trimEnd());
  }
}
