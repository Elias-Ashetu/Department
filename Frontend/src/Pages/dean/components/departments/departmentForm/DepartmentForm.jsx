
import { useState } from "react";

import BasicInformation from "../basicInformation/BasicInformation.jsx";
import AdditionalInformation from "../additionalInfo/AdditionalInformation.jsx";
import FormActions from "../formActions/FormActions.jsx";
import FormMessage from "../formMessage/FormMessage.jsx";

import { createDepartment } from "../../../../../services/dean/departmentService.js";

import styles from "./DepartmentForm.module.css";

// Initial form values
const INITIAL_FORM_DATA = {
  code: "",
  name: "",
  campusId: "",
  description: "",
  vision: "",
  mission: "",
  objectives: "",
};

export default function DepartmentForm() {
  // Shared department form state
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  // Form submission states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle changes from child components
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear previous messages when user edits the form
    setError("");
    setSuccess("");
  };

  // Reset the entire form
  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setError("");
    setSuccess("");
  };

  // Submit department information
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validate required fields
    if (
      !formData.code.trim() ||
      !formData.name.trim() ||
      !formData.campusId
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const departmentData = {
        code: formData.code.trim(),
        name: formData.name.trim(),
        campusId: formData.campusId,
        description: formData.description.trim(),
        vision: formData.vision.trim(),
        mission: formData.mission.trim(),
        objectives: formData.objectives.trim(),
      };

      const result = await createDepartment(departmentData);

      setSuccess(
        result.message || "Department created successfully."
      );

      // Clear form after successful creation
      setFormData(INITIAL_FORM_DATA);

      console.log("Created department:", result.data);

    } catch (err) {
      setError(
        err.message || "Unable to create department."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formCard}>

      {/* Form heading */}
      <div className={styles.formHeader}>
        <h2>Create Department</h2>
        <p>
          Enter the department information below.
        </p>
      </div>

      {/* Success and error messages */}
      <FormMessage
        success={success}
        error={error}
      />

      {/* Department creation form */}
      <form onSubmit={handleSubmit}>

        {/* Basic department information */}
        <BasicInformation
          formData={formData}
          onChange={handleChange}
        />

        {/* Additional department information */}
        <AdditionalInformation
          formData={formData}
          onChange={handleChange}
        />

        {/* Form actions */}
        <FormActions
          onReset={handleReset}
          loading={loading}
        />

      </form>
    </div>
  );
}
