import { useNavigate } from 'react-router-dom';
import { PagePaths } from '../../utils/utils.ts';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PagePaths.Main);
  };

  return (
    <>
      <h1>Not found</h1>
      <button onClick={handleClick}>Go home</button>
    </>
  );
}

export default NotFoundPage;
