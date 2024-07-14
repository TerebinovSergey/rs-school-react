import { useEffect, useState } from 'react';
import styles from './ErrorThrowing.module.css';

function ErrorThrowing() {
  const [makeMistake, setMakeMistake] = useState(false);

  useEffect(() => {
    if (makeMistake) {
      throw new Error('This is a custom error');
    }
  });

  return (
    <button
      className={styles.buttonError}
      onClick={() => {
        setMakeMistake(true);
      }}
    >
      To make a mistake
    </button>
  );
}

export default ErrorThrowing;
