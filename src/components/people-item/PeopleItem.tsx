import { Component } from 'react';
import styles from './PeopleItem.module.css';

type Props = {
  name: string;
  height: string;
  mass: string;
  url: string;
};

class PeopleItem extends Component<Props> {
  render() {
    const { name, height, mass } = this.props;
    return (
      <div className={styles.people}>
        <div>
          <span className={styles.people__subtitle}>Name: </span>
          <span>{name}</span>
        </div>
        <div>
          <span className={styles.people__subtitle}>Height: </span>
          <span>{height}</span>
        </div>
        <div>
          <span className={styles.people__subtitle}>Mass: </span>
          <span>{mass}</span>
        </div>
      </div>
    );
  }
}

export default PeopleItem;
