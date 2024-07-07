import { Component } from 'react';
import styles from './NewsItem.module.css';

type SearchProps = {
  title: string;
  author: string;
  url: string;
};

class NewsList extends Component<SearchProps> {
  render() {
    const { title, author, url } = this.props;
    return (
      <div className={styles.news}>
        <span className={styles.news__title}>{title}</span>
        <div>
          <span className={styles.news__author}>Author: </span>
          <span>{author}</span>
        </div>

        <a href={url}>Link to news</a>
      </div>
    );
  }
}

export default NewsList;
