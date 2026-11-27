
import DepartmentForm from "../components/departments/departmentForm/DepartmentForm.jsx";
import styles from "./department.module.css";

export default function Department() {
  return (
    <div className={styles.departmentPage}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Department</h1>
          <p>
            Create a new department and assign it to a campus.
          </p>
        </div>
      </div>

      <DepartmentForm />
    </div>
  );
}
