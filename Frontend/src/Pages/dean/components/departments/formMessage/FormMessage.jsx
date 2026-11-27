
import styles from "./FormMessage.module.css";

export default function FormMessage({ success, error }) {
  // Don't render anything when there are no messages
  if (!success && !error) {
    return null;
  }

  return (
    <div className={styles.messageContainer}>

      {/* Success message */}
      {success && (
        <div
          className={styles.successMessage}
          role="status"
          aria-live="polite"
        >
          <span className={styles.messageIcon}>✓</span>
          <p>{success}</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          className={styles.errorMessage}
          role="alert"
          aria-live="assertive"
        >
          <span className={styles.messageIcon}>!</span>
          <p>{error}</p>
        </div>
      )}

    </div>
  );
}
