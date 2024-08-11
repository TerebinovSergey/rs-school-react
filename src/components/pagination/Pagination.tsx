import styles from './Pagination.module.css';

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
        <div
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`${styles.link}${index + 1 === currentPage ? ' ' + styles.disabled : ''}`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
