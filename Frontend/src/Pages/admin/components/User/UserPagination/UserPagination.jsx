

import styles from "./UserPagination.module.css";

export default function UserPagination({
  currentPage,
  totalPage,
  onPageChange,
}) {
  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPage || 1}
      </span>

      <button
        disabled={currentPage >= (totalPage || 1)}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
