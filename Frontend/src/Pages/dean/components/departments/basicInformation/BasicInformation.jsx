
import { useEffect, useState } from "react";
import { getCampuses } from "../../../../../services/dean/departmentService.js";
import styles from "./BasicInformation.module.css";

export default function BasicInformation({ formData, onChange }) {
  // Campus state
  const [campuses, setCampuses] = useState([]);
  const [loadingCampuses, setLoadingCampuses] = useState(false);
  const [campusError, setCampusError] = useState("");

  // Fetch available campuses when component loads
  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        setLoadingCampuses(true);
        setCampusError("");

        const data = await getCampuses();

        setCampuses(data);
      } catch (error) {
        setCampusError(
          error.message || "Unable to load campuses."
        );
      } finally {
        setLoadingCampuses(false);
      }
    };

    fetchCampuses();
  }, []);

  return (
    <section className={styles.formSection}>

      {/* Section heading */}
      <div className={styles.sectionHeader}>
        <h3>Basic Information</h3>
        <p>
          Provide the department name, code, and campus.
        </p>
      </div>

      {/* Basic information fields */}
      <div className={styles.formGrid}>

        {/* Department Code */}
        <div className={styles.formGroup}>
          <label htmlFor="code">
            Department Code <span>*</span>
          </label>

          <input
            type="text"
            id="code"
            name="code"
            placeholder="e.g. CS"
            value={formData.code}
            onChange={onChange}
            required
          />
        </div>

        {/* Department Name */}
        <div className={styles.formGroup}>
          <label htmlFor="name">
            Department Name <span>*</span>
          </label>

          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Computer Science"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>

        {/* Campus Selection */}
        <div className={styles.formGroup}>
          <label htmlFor="campusId">
            Campus <span>*</span>
          </label>

          <select
            id="campusId"
            name="campusId"
            value={formData.campusId}
            onChange={onChange}
            required
            disabled={loadingCampuses || campuses.length === 0}
          >
            <option value="">
              {loadingCampuses
                ? "Loading campuses..."
                : campuses.length === 0
                  ? "No campuses available"
                  : "Select Campus"}
            </option>

            {campuses.map((campus) => (
              <option key={campus.id} value={campus.id}>
                {campus.name} ({campus.code})
              </option>
            ))}
          </select>

          {/* Campus loading error */}
          {campusError && (
            <p className={styles.fieldError} role="alert">
              {campusError}
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
