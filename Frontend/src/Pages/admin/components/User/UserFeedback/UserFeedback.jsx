

import styles from "./UserFeedback.module.css";

export default function UserFeedback({
  successMessage,
  actionError,
  onClearSuccess,
}) {
  return (
    <>
      {successMessage && (
        <div className={styles.success}>
          {successMessage}
          <button onClick={onClearSuccess}>×</button>
        </div>
      )}

      {actionError && (
        <div className={styles.error}>{actionError}</div>
      )}
    </>
  );
}
