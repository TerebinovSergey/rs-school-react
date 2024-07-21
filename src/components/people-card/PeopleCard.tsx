import { useEffect, useState } from 'react';
import { PERSON_PARAM, personInit, Swapi } from '../../services/Swapi.ts';
import Loader from '../loader/Loader.tsx';
import styles from './PeopleCard.module.css';
import { useNavigate } from 'react-router-dom';

function PeopleCard() {
  const [state, setState] = useState({ person: personInit, isLoad: false });
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const personId = searchParams.get(PERSON_PARAM);

  useEffect(() => {
    const loadPerson = async () => {
      if (!personId) return;
      setState((prevState) => ({ ...prevState, isLoad: true }));
      const person = await Swapi.getPerson(Number(personId ?? 0));
      setState({ person, isLoad: false });
    };
    loadPerson();
  }, [personId]);

  const handleClose = () => {
    searchParams.delete(PERSON_PARAM);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  if (!personId || !state.person.name) return <></>;

  if (state.isLoad) {
    return <Loader />;
  }

  const personDetails = [
    { label: 'Name', value: state.person.name, id: 1 },
    { label: 'Height', value: state.person.height, id: 2 },
    { label: 'Mass', value: state.person.mass, id: 3 },
    {
      label: 'Skin color',
      value: state.person.skin_color,
      id: 4,
    },
    { label: 'Eye color', value: state.person.eye_color, id: 5 },
    { label: 'Birthday', value: state.person.birth_year, id: 6 },
    { label: 'Gender', value: state.person.gender, id: 7 },
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
}

export default PeopleCard;
