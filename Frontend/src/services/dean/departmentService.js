

const API_URL = import.meta.env.VITE_API_URL;

// ============================================
// GET ALL ACTIVE CAMPUSES
// ============================================

export async function getCampuses() {
  const response = await fetch(`${API_URL}/api/campuses`, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch campuses."
    );
  }

  return result.data;
}

// ============================================
// GET CAMPUS BY ID
// ============================================

export async function getCampusById(campusId) {
  if (!campusId) {
    throw new Error("Campus ID is required.");
  }

  const response = await fetch(
    `${API_URL}/api/campuses/${encodeURIComponent(campusId)}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch campus details."
    );
  }

  return result.data;
}

// ============================================
// CREATE DEPARTMENT
// ============================================

export async function createDepartment(departmentData) {
  if (!departmentData.name?.trim()) {
    throw new Error("Department name is required.");
  }

  if (!departmentData.code?.trim()) {
    throw new Error("Department code is required.");
  }

  if (!departmentData.campusId) {
    throw new Error("Please select a campus.");
  }

  const response = await fetch(`${API_URL}/api/departments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: departmentData.name.trim(),
      code: departmentData.code.trim(),
      campusId: departmentData.campusId,

      // Optional fields
      description: departmentData.description?.trim() || "",
      vision: departmentData.vision?.trim() || "",
      mission: departmentData.mission?.trim() || "",
      objectives: departmentData.objectives?.trim() || "",
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create department."
    );
  }

  return result;
}
