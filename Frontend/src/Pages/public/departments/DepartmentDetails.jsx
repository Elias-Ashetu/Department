
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDepartmentById } from "../../../services/departmentinfo/departmentinfoService.js";
import styles from "./department.module.css";

function DepartmentDetails() {
  const { id } = useParams();

  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const data = await getDepartmentById(id);
        setDepartment(data);
      } catch (err) {
        console.error("Department fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  if (loading) {
    return <p>Loading department details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!department) {
    return <h2>Department not found!</h2>;
  }

  return (
    <div className={styles.departmentDetails}>

      <Link to="/departments" className={styles.backLink}>
        ← Back to Departments
      </Link>

      <div className={styles.detailsHero}>
        <div>
          <span>{department.code}</span>
          <h1>{department.name}</h1>
          <p>
            Campus: {department.campus?.name || "Not available"}
          </p>
        </div>
      </div>

      <section className={styles.detailsSection}>
        <h2>About the Department</h2>
        <p>
          {department.description ||
            "Department description is not available yet."}
        </p>

        <h2>Vision</h2>
        <p>
          {department.vision || "Vision information is not available yet."}
        </p>

        <h2>Mission</h2>
        <p>
          {department.mission || "Mission information is not available yet."}
        </p>

        <h2>Objectives</h2>
        <p>
          {department.objectives ||
            "Objectives information is not available yet."}
        </p>

        <h2>Department Head</h2>

        {department.headAssignments?.length > 0 ? (
          department.headAssignments.map((assignment) => (
            <p key={assignment.id}>
              {assignment.user?.name || "Name not available"}
            </p>
          ))
        ) : (
          <p>Department head information is not available.</p>
        )}
      </section>

    </div>
  );
}

export default DepartmentDetails;
