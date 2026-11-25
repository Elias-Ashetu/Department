import styles from "./UserTable.module.css";

const formatRole = (role) => {
  const roleNames = {
    DEAN: "Dean",
    COORDINATOR: "Coordinator",
    DEPARTMENT_HEAD: "Department Head",
    ADMIN: "Admin",
  };

  return roleNames[role] || role;
};

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
};

export default function UserTable({
  users,
  loading,
  error,
  onEdit,
  onDeactivate,
}) {
  const canManageUser = (role) => role === "DEAN" || role === "COORDINATOR";

  if (loading) {
    return <p className={styles.message}>Loading users...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (users.length === 0) {
    return <p className={styles.message}>No users found.</p>;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User</th>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.userName}>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
              </td>

              <td>{user.username || "-"}</td>

              <td>
                <span className={styles.roleBadge}>
                  {formatRole(user.role)}
                </span>
              </td>

              <td>
                <span
                  className={
                    user.isActive
                      ? `${styles.status} ${styles.active}`
                      : `${styles.status} ${styles.inactive}`
                  }
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </td>

              <td>{formatDate(user.createdAt)}</td>

              <td>
                {canManageUser(user.role) ? (
                  <div className={styles.actions}>
                    <button type="button" onClick={() => onEdit(user.id)}>
                      Update
                    </button>

                    <button
                      className={styles.deactivateButton}
                      onClick={() => onDeactivate(user)}
                      disabled={!user.isActive}
                    >
                      Deactivate
                    </button>
                  </div>
                ) : (
                  <span className={styles.noAction}>No actions</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
