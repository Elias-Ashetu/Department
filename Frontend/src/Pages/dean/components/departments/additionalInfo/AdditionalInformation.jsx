
import styles from "./AdditionalInformation.module.css";

export default function AdditionalInformation({ formData, onChange }) {
  return (
    <section className={styles.formSection}>

      {/* Section heading */}
      <div className={styles.sectionHeader}>
        <h3>Additional Information</h3>
        <p>
          Provide additional details about the department.
          All fields in this section are optional.
        </p>
      </div>

      {/* Department description */}
      <div className={styles.formGroup}>
        <label htmlFor="description">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows="3"
          placeholder="Enter department description..."
          value={formData.description}
          onChange={onChange}
        />
      </div>

      {/* Department vision */}
      <div className={styles.formGroup}>
        <label htmlFor="vision">
          Vision
        </label>

        <textarea
          id="vision"
          name="vision"
          rows="3"
          placeholder="Enter department vision..."
          value={formData.vision}
          onChange={onChange}
        />
      </div>

      {/* Department mission */}
      <div className={styles.formGroup}>
        <label htmlFor="mission">
          Mission
        </label>

        <textarea
          id="mission"
          name="mission"
          rows="3"
          placeholder="Enter department mission..."
          value={formData.mission}
          onChange={onChange}
        />
      </div>

      {/* Department objectives */}
      <div className={styles.formGroup}>
        <label htmlFor="objectives">
          Objectives
        </label>

        <textarea
          id="objectives"
          name="objectives"
          rows="3"
          placeholder="Enter department objectives..."
          value={formData.objectives}
          onChange={onChange}
        />
      </div>

    </section>
  );
}
