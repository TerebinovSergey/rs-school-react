import { useEffect, useState } from 'react';

function ErrorThrowing() {
  const [makeMistake, setMakeMistake] = useState(false);

  useEffect(() => {
    if (makeMistake) {
      throw new Error('This is a custom error');
    }
  });

  return (
    <button
      onClick={() => {
        setMakeMistake(true);
      }}
    >
      To make a mistake
    </button>
  );
}

export default ErrorThrowing;
