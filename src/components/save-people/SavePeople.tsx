import { useDispatch, useSelector } from 'react-redux';
import styles from './SavePeople.module.css';
import { RootState } from '../../store/store';
import { removeAllPeople } from '../../store/reducers/selectedPeopleSlice';
import { useRef, useState } from 'react';

const SavePeople = () => {
  const selectedPeople = useSelector(
    (state: RootState) => state.selectedPeople.selectedPeople,
  );
  const [fileName, setFileName] = useState('');
  const [link, setLink] = useState('');
  const linkRef = useRef<HTMLAnchorElement>(null);
  const dispatch = useDispatch();

  const handleRemoveSelectedPeople = () => {
    dispatch(removeAllPeople());
  };

  const convertToCsv = () => {
    const headers = Object.keys(selectedPeople[0]).join(',');
    const rows = selectedPeople
      .map((people) => Object.values(people).join(','))
      .join('\n');
    return `${headers}\n${rows}`;
  };

  const download = () => {
    setFileName(`${selectedPeople.length}_people.csv`);
    const csv = convertToCsv();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    setLink(url);
    if (linkRef.current && linkRef.current.href === url) {
      linkRef.current.click();
    }
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
      <a ref={linkRef} download={fileName} href={link}>
        <button onClick={download}>Download</button>
      </a>
    </div>
  );
};

export default SavePeople;
