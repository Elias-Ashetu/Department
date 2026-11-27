
// ==========================================
// Admin User Management API Service
// ==========================================

// Backend base URL
// Remove trailing slash to avoid double slashes in API URLs.
const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

// Default request configuration
const REQUEST_OPTIONS = {
  credentials: "include",
};

// ==========================================
// Reusable API Response Handler
// ==========================================

async function handleResponse(response, errorMessage) {
  let result = {};

  try {
    result = await response.json();
  } catch {
    result = {};
  }

  console.log("API Status:", response.status);
  console.log("API Response:", result);

  if (!response.ok || result.success === false) {
    throw new Error(
      result.message || errorMessage
    );
  }

  return result;
}

// ==========================================
//  Create Dean or Coordinator
// ==========================================

export async function createUser(userData) {
  const requestBody = {
    name: userData.name.trim(),
    email: userData.email.trim(),
    employeeId: userData.employeeId.trim(),
    role: userData.role,
  };

  console.log("Creating user:", requestBody);

  const response = await fetch(`${API_URL}/api/admin/users`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const result = await handleResponse(
    response,
    "Failed to create user."
  );

  return result.data;
};

// ==========================================
//  Get All Users
// Supports:
// - Search by name, email, or username
// - Role filtering
// - Account status filtering
// - Pagination
// ==========================================

export async function getAllUsers({
  page = 1,
  limit = 5,
  search = "",
  role = "",
  isActive = "",
} = {}) {
  // Build query parameters
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", String(limit));

  // Exclude student accounts from admin user management
  params.set("excludeRole", "STUDENT");

  // Add search term only when provided
  const searchTerm = search.trim();

  if (searchTerm) {
    params.set("search", searchTerm);
  }

  // Add role filter
  if (role) {
    params.set("role", role);
  }

  // Add account status filter
  if (isActive !== "") {
    params.set("isActive", String(isActive));
  }

  // Send GET request
  const response = await fetch(
    `${API_URL}/api/admin/users?${params.toString()}`,
    {
      ...REQUEST_OPTIONS,
      method: "GET",
    }
  );

  return handleResponse(
    response,
    "Failed to retrieve users."
  );
}

// ==========================================
// Get One User by ID
// ==========================================

export async function getUserById(id) {
  const response = await fetch(
    `${API_URL}/api/admin/users/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch user information."
    );
  }

  return result;
}

// ==========================================
//  Update Dean or Coordinator
// ==========================================

export async function updateUser(id, userData) {
  const response = await fetch(
    `${API_URL}/api/admin/users/${id}`,
    {
      ...REQUEST_OPTIONS,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        username: userData.username,
        employeeId: userData.employeeId,
        phone: userData.phone,
        jobTitle: userData.jobTitle,
        office: userData.office,
      }),
    }
  );

  const result = await handleResponse(
    response,
    "Failed to update user."
  );

  return result.data || result;
}

// ==========================================
//  Deactivate Dean or Coordinator
// ==========================================

export async function deleteUser(id) {
  const response = await fetch(
    `${API_URL}/api/admin/users/${id}`,
    {
      ...REQUEST_OPTIONS,
      method: "DELETE",
    }
  );

  return handleResponse(
    response,
    "Failed to deactivate user."
  );
}
