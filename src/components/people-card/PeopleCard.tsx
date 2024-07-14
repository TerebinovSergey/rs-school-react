import { useEffect, useState } from 'react';
import { PERSON_PARAM, personInit, Swapi } from '../../services/Swapi.ts';
import Loader from '../loader/Loader.tsx';
import styles from './PeopleCard.module.css';
import { useNavigate } from 'react-router-dom';

function PeopleCard() {
  const [person, setPerson] = useState(personInit);
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const personId = searchParams.get(PERSON_PARAM);

  useEffect(() => {
    if (!personId) return;
    const loadPerson = async () => {
      setIsLoad(true);
      const person = await Swapi.getPerson(Number(personId ?? 0));
      setPerson(person);
      setIsLoad(false);
    };
    loadPerson();
  }, [personId]);

  const handleClose = () => {
    searchParams.delete(PERSON_PARAM);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  if (!personId || !person.name) return <></>;

  if (isLoad) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <h1>Card</h1>
      <div className={styles.personCard}>
        <div>
          <span className={styles.personCard__subtitle}>Name: </span>
          <span>{person.name}</span>
        </div>
        <div>
          <span className={styles.personCard__subtitle}>Height: </span>
          <span>{person.height}</span>
        </div>
        <div>
          <span className={styles.personCard__subtitle}>Mass: </span>
          <span>{person.mass}</span>
        </div>
        <div>
          <span className={styles.personCard__subtitle}>Skin color: </span>
          <span>{person.skin_color}</span>
        </div>
        <div>
          <span className={styles.personCard__subtitle}>Eye color: </span>
          <span>{person.eye_color}</span>
        </div>
        <div>
          <span className={styles.personCard__subtitle}>Birthday: </span>
          <span>{person.birth_year}</span>
        </div>
        <div>
          <span className={styles.personCard__subtitle}>Gender: </span>
          <span>{person.gender}</span>
        </div>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default PeopleCard;
