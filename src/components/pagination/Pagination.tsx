import { Link } from 'react-router-dom';
import styles from './Pagination.module.css';
import { PAGE_PARAM } from '../../services/Swapi';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className={styles.wrapper}>
      {Array.from({ length: totalPages }, (_, index) => (
        <Link
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`${styles.link}${index + 1 === currentPage ? ' ' + styles.disabled : ''}`}
          to={`?${PAGE_PARAM}=${index + 1}`}
        >
          {index + 1}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
