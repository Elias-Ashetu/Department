import styles from "./UserHeader.module.css";

export default function UserHeader({ onCreateUser }) {
  return (
    <div className={styles.header}>
      <div>
        <h1>User Management</h1>
        <p>Create, search, and manage university user accounts.</p>
      </div>

      <button
        type="button"
        onClick={onCreateUser}
        className={styles.addButton}
      >
        + Create User
      </button>
    </div>
  );
}