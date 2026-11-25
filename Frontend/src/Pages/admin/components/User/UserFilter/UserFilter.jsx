
import { useState } from "react";
import styles from "./UserFilter.module.css";

export default function UserFilter({
  isActive,
  setIsActive,
  setCurrentPage,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const handleStatusChange = (status) => {
    setIsActive(status);
    setCurrentPage(1);
    setShowFilters(false);
  };

  return (
    <div className={styles.filterContainer}>
      <button
        type="button"
        className={styles.filterButton}
        onClick={() => setShowFilters((prev) => !prev)}
      >
        ☰ Filter
        <span>{showFilters ? "▲" : "▼"}</span>
      </button>

      {showFilters && (
        <div className={styles.dropdown}>
          <button
            type="button"
            className={isActive === "" ? styles.active : ""}
            onClick={() => handleStatusChange("")}
          >
            All Statuses
          </button>

          <button
            type="button"
            className={isActive === "true" ? styles.active : ""}
            onClick={() => handleStatusChange("true")}
          >
            Active
          </button>

          <button
            type="button"
            className={isActive === "false" ? styles.active : ""}
            onClick={() => handleStatusChange("false")}
          >
            Inactive
          </button>
        </div>
      )}
    </div>
  );
}
