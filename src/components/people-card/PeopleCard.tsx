import styles from './PeopleCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { removePerson } from '../../store/reducers/personSlice.ts';
import { RootState } from '../../store/store.ts';
import { useRouter } from 'next/router';
import { PERSON_PARAM } from '../../services/types.ts';
import { PagePaths } from '../../utils/utils.ts';
import { useEffect } from 'react';

const PeopleCard = () => {
  const person = useSelector((state: RootState) => state.person.person);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(removePerson());
  }, [dispatch]);

  const handleClose = () => {
    dispatch(removePerson());
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(PERSON_PARAM);
    router.push(`${PagePaths.Main}?${searchParams.toString()}`);
  };

  if (!person.name && !person.url) {
    return <></>;
  }

  const { name, height, mass, skin_color, eye_color, birth_year, gender } =
    person;

  const personDetails = [
    { label: 'Name', value: name, id: 1 },
    { label: 'Height', value: height, id: 2 },
    { label: 'Mass', value: mass, id: 3 },
    {
      label: 'Skin color',
      value: skin_color,
      id: 4,
    },
    { label: 'Eye color', value: eye_color, id: 5 },
    { label: 'Birthday', value: birth_year, id: 6 },
    { label: 'Gender', value: gender, id: 7 },
  ];

  return (
    <div className={styles.wrapper}>
      <h1>Card</h1>
      <div className={styles.personCard}>
        {personDetails.map((detail) => (
          <div key={detail.id}>
            <span className={styles.personCard__subtitle}>
              {detail.label}:{' '}
            </span>
            <span>{detail.value}</span>
          </div>
        ))}
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default PeopleCard;
