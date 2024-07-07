import { Component } from 'react';

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

class NewsList extends Component {
  state = {
    serachQuery: 'world',
    result: responceNewsInit,
  };

  componentDidMount(): void {
    const { serachQuery } = this.state;
    fetch(
      `${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${serachQuery}&page=1&hitsPerPage=10`,
    )
      .then((res) => res.json() as Promise<ResponceNews>)
      .then((result) => this.setNews(result))
      .catch((error: unknown) => console.log(error));
  }

  setNews = (result: ResponceNews) => {
    this.setState({ result });
  };

  render() {
    const {
      result: { hits },
    } = this.state;
    return (
      <div className="wpapper">
        <h1>News</h1>
        <ul>
          {hits.map(({ title, author, url, objectID }) => {
            return <li key={objectID}>{`${title} ${author} ${url}`}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default NewsList;
