
import { useEffect, useState } from "react";

import {
  getAllUsers,
} from "../../../../services/admin/userService.js";

// Pagination configuration
const PAGE_SIZE = 10;

const DEFAULT_PAGINATION = {
  totalUsers: 0,
  currentPage: 1,
  totalPage: 1,
  pageSize: PAGE_SIZE,
};

export default function useUsers() {
  // Users state
  const [users, setUsers] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState("");

  // Search and filter states
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isActive, setIsActive] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(
    DEFAULT_PAGINATION
  );

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch users
  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      setListLoading(true);
      setListError("");

      try {
        const result = await getAllUsers({
          page: currentPage,
          limit: PAGE_SIZE,
          search: debouncedSearch,
          role: selectedRole,
          isActive,
        });

        if (cancelled) return;

        setUsers(result.users || []);

        setPagination(
          result.pagination || DEFAULT_PAGINATION
        );

      } catch (error) {
        if (cancelled) return;

        setListError(
          error.message || "Unable to load users."
        );

      } finally {
        if (!cancelled) {
          setListLoading(false);
        }
      }
    }

    fetchUsers();

    return () => {
      cancelled = true;
    };
  }, [
    currentPage,
    debouncedSearch,
    selectedRole,
    isActive,
  ]);

  // Refresh after create, update, or deactivate
  const refreshUsers = async () => {
    setListLoading(true);
    setListError("");

    try {
      const result = await getAllUsers({
        page: currentPage,
        limit: PAGE_SIZE,
        search: debouncedSearch,
        role: selectedRole,
        isActive,
      });

      setUsers(result.users || []);

      setPagination(
        result.pagination || DEFAULT_PAGINATION
      );

    } catch (error) {
      setListError(
        error.message || "Unable to load users."
      );

    } finally {
      setListLoading(false);
    }
  };

  // Handle role filtering
  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setCurrentPage(1);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedRole("");
    setIsActive("");
    setCurrentPage(1);
  };

  return {
    // Users
    users,
    setUsers,

    // Loading and errors
    listLoading,
    listError,
    setListError,

    // Search
    search,
    setSearch,

    // Role filter
    selectedRole,
    setSelectedRole,
    handleRoleChange,

    // Status filter
    isActive,
    setIsActive,

    // Pagination
    currentPage,
    setCurrentPage,
    pagination,
    setPagination,

    // Actions
    resetFilters,
    refreshUsers,
  };
}
