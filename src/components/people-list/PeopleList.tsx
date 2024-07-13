import { Component } from 'react';
import Title from '../title/Title.tsx';
import PeopleItem from '../people-item/PeopleItem.tsx';
import styles from './PeopleList.module.css';
import Loader from '../loader/Loader.tsx';
import { ListOfPeople, listOfPeopleInit, Swapi } from '../../services/Swapi.ts';

type State = {
  result: ListOfPeople;
  load: boolean;
};

type Props = {
  query: string;
};

class PeopleList extends Component<Props, State> {
  state = {
    result: listOfPeopleInit,
    load: false,
  };

  async loadPeople() {
    this.setState({ load: true });
    const { query } = this.props;
    const listOfPeople = await Swapi.getPeople(query);
    this.setState({ load: false, result: listOfPeople });
  }

  componentDidMount(): void {
    this.loadPeople();
  }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.query !== this.props.query) {
      this.loadPeople();
    }
  }

  render() {
    const {
      result: { results },
      load,
    } = this.state;
    if (load) {
      return <Loader />;
    }
    return (
      <div>
        <Title title="People" />
        <ul className={styles.peopleList}>
          {results.map(({ name, height, url, mass }) => {
            return (
              <li className={styles.people} key={url}>
                {' '}
                <PeopleItem
                  name={name ?? ''}
                  height={height ?? ''}
                  mass={mass ?? ''}
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

export default PeopleList;
