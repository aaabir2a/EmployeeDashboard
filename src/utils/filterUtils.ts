// utils/filterUtils.ts
import type { Employee, FilterState, SortState } from "../types/employee.types";

/**
 * Filter employees based on filter state
 */
export const filterEmployees = (
  employees: Employee[],
  filters: FilterState
): Employee[] => {
  return employees.filter((employee) => {
    // Filter by archived status
    if (filters.showArchived !== undefined) {
      if (!filters.showArchived && employee.isArchived) return false;
      if (filters.showArchived && !employee.isArchived) return false;
    }

    // Filter by search (name, department, role, status)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        employee.name.toLowerCase().includes(searchLower) ||
        employee.department.toLowerCase().includes(searchLower) ||
        employee.role.toLowerCase().includes(searchLower) ||
        employee.status.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;
    }

    // Filter by department
    if (filters.department && employee.department !== filters.department) {
      return false;
    }

    // Filter by status
    if (filters.status && employee.status !== filters.status) {
      return false;
    }

    // Filter by date range
    if (filters.dateRange && filters.dateRange.length === 2) {
      const [startDate, endDate] = filters.dateRange;
      const joiningDate = new Date(employee.joiningDate);
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (joiningDate < start || joiningDate > end) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Sort employees - supports both call signatures for compatibility
 */
export function sortEmployees(
  employees: Employee[],
  sortState: SortState
): Employee[];
export function sortEmployees(
  employees: Employee[],
  field: string,
  order: "ascend" | "descend" | null
): Employee[];
export function sortEmployees(
  employees: Employee[],
  fieldOrSortState: string | SortState,
  order?: "ascend" | "descend" | null
): Employee[] {
  // Handle both call signatures
  let field: string;
  let sortOrder: "ascend" | "descend" | null;

  if (typeof fieldOrSortState === "string") {
    // Called with separate parameters
    field = fieldOrSortState;
    sortOrder = order ?? null;
  } else {
    // Called with SortState object
    field = fieldOrSortState.field;
    sortOrder = fieldOrSortState.order;
  }

  if (!field || !sortOrder) {
    return employees;
  }

  const sorted = [...employees];
  const isAscending = sortOrder === "ascend";

  sorted.sort((a, b) => {
    let aValue: any = a[field as keyof Employee];
    let bValue: any = b[field as keyof Employee];

    // Handle date fields
    if (field === "joiningDate" || field === "createdAt" || field === "updatedAt") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    // Handle string fields
    if (typeof aValue === "string" && typeof bValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    // Compare values
    if (aValue < bValue) return isAscending ? -1 : 1;
    if (aValue > bValue) return isAscending ? 1 : -1;
    return 0;
  });

  return sorted;
}