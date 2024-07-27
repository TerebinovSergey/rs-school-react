import { useDispatch, useSelector } from 'react-redux';
import styles from './savePeople.module.css';
import { RootState } from '../../store/store';
import { removeAllPeople } from '../../store/reducers/selectedPeopleSlice';

const SavePeople = () => {
  const selectedPeople = useSelector(
    (state: RootState) => state.selectedPeople.selectedPeople,
  );
  const dispatch = useDispatch();

  const handleRemoveSelectedPeople = () => {
    dispatch(removeAllPeople());
  };

  if (!selectedPeople.length) {
    return <></>;
  }

  return (
    <div className={styles.saveWrapper}>
      <span
        className={styles.selected}
      >{`selected ${selectedPeople.length}`}</span>
      <button onClick={handleRemoveSelectedPeople}>Unselect all</button>
      <button>Download</button>
    </div>
  );
};

export default SavePeople;
