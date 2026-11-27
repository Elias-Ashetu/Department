import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./department.module.css";
import { getDepartments } from "../../../services/departmentinfo/departmentinfoService.js";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const visibleDepartments = showAll
    ? departments
    : departments.slice(0, 3);

  if (loading) return <p>Loading departments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.departmentPage}>
      <section className={styles.departmentHero}>
        <p className={styles.sectionLabel}>ACADEMIC PROGRAMS</p>
        <h1>Department Information</h1>
        <p className={styles.heroDescription}>
          Explore available departments across Wollega University.
        </p>
      </section>

      <section className={styles.departmentList}>
        <p className={styles.sectionLabel}>FIND YOUR DIRECTION</p>
        <h2>Available Departments</h2>

        <p className={styles.listDescription}>
          Explore departments and their campus information.
        </p>

        <div className={styles.departmentGrid}>
          {visibleDepartments.map((department) => (
            <div className={styles.departmentCard} key={department.id}>
              <div className={styles.departmentContent}>
                <p className={styles.approvedSeats}>
                  {department.code}
                </p>

                <h3>{department.name}</h3>

                <p className={styles.departmentDescription}>
                  {department.description ||
                    "Department information is not available yet."}
                </p>

                <p>
                  Campus: {department.campus?.name || "Not specified"}
                </p>

                <Link
                  className={styles.departmentButton}
                  to={`/departments/${department.id}`}
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {departments.length > 3 && (
          <div className={styles.viewAllContainer}>
            <button
              className={styles.viewAllButton}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less ↑" : "View All Departments →"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Departments;