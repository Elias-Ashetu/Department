
import styles from "./FormActions.module.css";

export default function FormActions({ onReset, loading }) {
  return (
    <div className={styles.formActions}>

      {/* Reset button */}
      <button
        type="button"
        className={styles.resetButton}
        onClick={onReset}
        disabled={loading}
      >
        Reset
      </button>

      {/* Create department button */}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className={styles.spinner}></span>
            Creating Department...
          </>
        ) : (
          "Create Department"
        )}
      </button>

    </div>
  );
}
