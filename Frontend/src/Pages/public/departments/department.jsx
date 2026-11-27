import React from 'react'
import { Link } from "react-router-dom";
import "./department.css";
import { useEffect, useState } from 'react';
import { getDepartments } from '../../../services/departmentService';

function Departments(){
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

  if (loading) {
    return <p>Loading departments...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="department-page">

      <section className="department-hero">
        <p className="section-label">ACADEMIC PROGRAMS</p>
        <h1>Department Information</h1>
        <p className="hero-description">
          Explore available departments across Wollega University.
        </p>
      </section>

      <section className="department-list">
        <p className="section-label">FIND YOUR DIRECTION</p>
        <h2>Available Departments</h2>

        <p className="list-description">
          Explore departments and their campus information.
        </p>

        <div className="department-grid">
          {visibleDepartments.map((department) => (
            <div className="department-card" key={department.id}>

              <div className="department-content">
                <p className="approved-seats">
                  {department.code}
                </p>

                <h3>{department.name}</h3>

                <p className="department-description">
                  {department.description ||
                    "Department information is not available yet."}
                </p>

                <p>
                  Campus: {department.campus?.name || "Not specified"}
                </p>

                <Link
                  className="department-button"
                  to={`/departments/${department.id}`}
                >
                  View Details →
                </Link>

              </div>
            </div>
          ))}
        </div>

        {departments.length > 3 && (
          <div className="view-all-container">
            <button
              className="view-all-button"
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
