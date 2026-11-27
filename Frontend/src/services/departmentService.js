
const API_URL = "https://department-selection-backend.onrender.com";

export const getDepartments = async () => {
  const response = await fetch(`${API_URL}/api/departments`);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const result = await response.json();

  console.log("API Response:", result);

  return result.data;
};
export const getDepartmentById = async (id) => {
  const response = await fetch(
    `${API_URL}/api/departments/${id}`
  );

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const result = await response.json();

  return result.data;
};