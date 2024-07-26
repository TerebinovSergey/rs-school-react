import { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext.ts';
import Checkbox from '../checkbox/Checkbox.tsx';
import styles from './PeopleItem.module.css';
import { IPeople } from '../../models/IPeople.ts';
import {
  addPeople,
  removePeople,
} from '../../store/reducers/selectedPeopleSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

type Props = {
  people: IPeople;
};

function PeopleItem({ people }: Props) {
  const { theme } = useTheme();
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const selectedPeople = useSelector(
    (state: RootState) => state.selectedPeople.selectedPeople,
  );

  const { name, height, mass } = people;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (isChecked) {
      dispatch(addPeople(people));
    } else {
      dispatch(removePeople(people));
    }
  };

  useEffect(() => {
    const checkedPeople = selectedPeople.some(
      (selPeople) => selPeople.url === people.url,
    );
    setChecked(checkedPeople);
  }, [selectedPeople, people]);

  return (
    <div className={`${styles[`${theme}People`]} ${styles.people}`}>
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
      <Checkbox
        label={checked ? 'remove' : 'add'}
        checked={checked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
}

export default PeopleItem;
