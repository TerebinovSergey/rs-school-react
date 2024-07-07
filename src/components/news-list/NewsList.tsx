import { Component } from 'react';
import Title from '../title/Title';
import NewsItem from '../news-item/NewsItem.tsx';
import styles from './NewsList.module.css';
import Loader from '../loader/Loader.tsx';

const BASE_PATH = 'https://hn.algolia.com/api/v1/';
const SEARCH_PATH = '/search';
const SEARCH_PARAM = 'query=';

type News = {
  title: string;
  url: string;
  author: string;
  objectID: string;
};

type ResponceNews = {
  hits: News[];
  nbHits: number;
  nbPages: number;
  page: number;
};

const responceNewsInit: ResponceNews = {
  hits: [],
  nbHits: 0,
  nbPages: 0,
  page: 0,
};

type NewsListState = {
  result: ResponceNews;
  load: boolean;
};

type SearchProps = {
  query: string;
};

class NewsList extends Component<SearchProps, NewsListState> {
  state = {
    result: responceNewsInit,
    load: false,
  };

  loadNews() {
    this.setState({ load: true });
    const { query } = this.props;
    fetch(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${query}`)
      .then((res) => res.json() as Promise<ResponceNews>)
      .then((result) => this.setNews(result))
      .catch((error: unknown) => console.log(error))
      .finally(() => this.setState({ load: false }));
  }

  componentDidMount(): void {
    this.loadNews();
  }

  componentDidUpdate(prevProps: SearchProps): void {
    if (prevProps.query !== this.props.query) {
      this.loadNews();
    }
  }

  setNews = (result: ResponceNews) => {
    this.setState({ result });
  };

  render() {
    const {
      result: { hits },
      load,
    } = this.state;
    if (load) {
      return <Loader />;
    }
    return (
      <div>
        <Title title="News" />
        <ul className={styles.newsList}>
          {hits.map(({ title, author, url, objectID }) => {
            return (
              <li className={styles.news} key={objectID}>
                {' '}
                <NewsItem
                  title={title ?? ''}
                  author={author ?? ''}
                  url={url ?? ''}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default NewsList;
