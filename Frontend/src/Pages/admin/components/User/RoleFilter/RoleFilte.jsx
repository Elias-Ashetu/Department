

import styles from "./RoleFilter.module.css";

const roles = [
  { label: "All", value: "" },
  { label: "Dean", value: "DEAN" },
  { label: "Coordinator", value: "COORDINATOR" },
  { label: "Department Head", value: "DEPARTMENT_HEAD" },
  { label: "Admin", value: "ADMIN" },
];

export default function RoleFilter({
  selectedRole,
  onRoleChange,
}) {
  return (
    <div className={styles.section}>
      <h3>Filter by Role</h3>

      <div className={styles.buttons}>
        {roles.map((role) => (
          <button
            key={role.value || "ALL"}
            className={
              selectedRole === role.value
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
            onClick={() => onRoleChange(role.value)}
          >
            {role.label}
          </button>
        ))}
      </div>
    </div>
  );
}
