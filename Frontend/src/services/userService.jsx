
const API_URL = import.meta.env.VITE_API_URL;

// Create Dean or Coordinator
export async function createUser(userData) {
  const response = await fetch(
    `${API_URL}/api/admin/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        employeeId: userData.employeeId,
         role: userData.role,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create user."
    );
  }

  // Backend returns data.user and data.temporaryPassword
  if (!result.data?.user || !result.data?.temporaryPassword) {
    throw new Error("Unexpected response from the server.");
  }

  return result.data;
}
