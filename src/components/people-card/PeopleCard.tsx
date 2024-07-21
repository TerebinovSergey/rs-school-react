import { PERSON_PARAM } from '../../services/types.ts';
import Loader from '../loader/Loader.tsx';
import styles from './PeopleCard.module.css';
import { useNavigate } from 'react-router-dom';
import { starWarsApi } from '../../services/starWarsApi.ts';

function PeopleCard() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const personId = searchParams.get(PERSON_PARAM);
  const { data, isLoading } = starWarsApi.useGetPersonQuery(
    Number(personId ?? 0),
  );

  const handleClose = () => {
    searchParams.delete(PERSON_PARAM);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  if (!personId) return <></>;

  if (isLoading) {
    return <Loader />;
  }

  if (!data) return <></>;

  const personDetails = [
    { label: 'Name', value: data.name, id: 1 },
    { label: 'Height', value: data.height, id: 2 },
    { label: 'Mass', value: data.mass, id: 3 },
    {
      label: 'Skin color',
      value: data.skin_color,
      id: 4,
    },
    { label: 'Eye color', value: data.eye_color, id: 5 },
    { label: 'Birthday', value: data.birth_year, id: 6 },
    { label: 'Gender', value: data.gender, id: 7 },
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
