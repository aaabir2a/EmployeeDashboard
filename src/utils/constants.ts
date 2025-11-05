export const DEPARTMENTS = ["Engineering", "HR", "Finance", "Marketing", "Operations", "Sales"]

export const STATUS_OPTIONS = ["Active", "On Leave", "Resigned"]

export const STATUS_COLORS: Record<string, string> = {
  Active: "green",
  "On Leave": "orange",
  Resigned: "red",
}

export const DEFAULT_PAGE_SIZE = 10

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

export const PERFORMANCE_SCORE_MIN = 0
export const PERFORMANCE_SCORE_MAX = 100

export const DATE_FORMAT = "YYYY-MM-DD"

export const TOAST_DURATION = 3000

export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  NAME_MIN: "Name must be at least 2 characters",
  FUTURE_DATE: "Joining date cannot be in the future",
  PERFORMANCE_RANGE: "Performance score must be between 0 and 100",
  EMAIL_INVALID: "Please enter a valid email",
}

export const STORAGE_KEYS = {
  VIEW_MODE: "employee-view-mode",
  SORT: "employee-sort",
  PAGINATION: "employee-pagination",
  FILTERS: "employee-filters",
}

export const MESSAGES = {
  CREATE_SUCCESS: "Employee created successfully",
  UPDATE_SUCCESS: "Employee updated successfully",
  DELETE_SUCCESS: "Employee deleted successfully",
  ARCHIVE_SUCCESS: "Employee archived successfully",
  RESTORE_SUCCESS: "Employee restored successfully",
  CREATE_ERROR: "Failed to create employee",
  UPDATE_ERROR: "Failed to update employee",
  DELETE_ERROR: "Failed to delete employee",
  ARCHIVE_ERROR: "Failed to archive employee",
  RESTORE_ERROR: "Failed to restore employee",
  LOAD_ERROR: "Failed to load employees",
}

export const SORT_OPTIONS = [
  { label: "Name (A-Z)", value: "name-ascend" },
  { label: "Name (Z-A)", value: "name-descend" },
  { label: "Newest First", value: "createdAt-descend" },
  { label: "Oldest First", value: "createdAt-ascend" },
  { label: "Performance (High-Low)", value: "performanceScore-descend" },
  { label: "Performance (Low-High)", value: "performanceScore-ascend" },
]
