import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { removeAllPeople } from '../../store/reducers/selectedPeopleSlice';
import { useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './SavePeople.module.css';

const SavePeople = () => {
  const { theme } = useTheme();
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
    <div className={`${styles.saveWrapper} ${styles[theme]}`}>
      <span
        className={styles.title}
      >{`selected ${selectedPeople.length}`}</span>
      <button
        className={styles.saveButton}
        onClick={handleRemoveSelectedPeople}
      >
        Unselect all
      </button>
      <a
        className={styles.saveLink}
        ref={linkRef}
        download={fileName}
        href={link}
      >
        <button className={styles.saveButton} onClick={download}>
          Download
        </button>
      </a>
    </div>
  );
};

export default SavePeople;
