import { Link } from 'react-router-dom';
import { PagePaths } from '../../utils/utils.ts';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <>
      <h1>Not found</h1>
      <Link className={styles.link} to={PagePaths.Main}>
        Go home
      </Link>
    </>
  );
}

export default NotFoundPage;
