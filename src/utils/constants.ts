// utils/constants.ts

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = ["5", "10", "20", "50"];

// LocalStorage Keys
export const STORAGE_KEYS = {
  VIEW_MODE: "employee_view_mode",
  SORT: "employee_sort_state",
  PAGINATION: "employee_pagination",
  FILTERS: "employee_filters",
} as const;

// Department Options
export const DEPARTMENTS = [
  "Engineering",
  "HR",
  "Finance",
  "Marketing",
  "Sales",
  "Operations",
  "Legal",
] as const;

// Status Options
export const STATUS_OPTIONS = ["Active", "On Leave", "Resigned"] as const;

// Status Colors for Tags
export const STATUS_COLORS = {
  Active: "green",
  "On Leave": "orange",
  Resigned: "red",
} as const;

// Performance Score Ranges
export const PERFORMANCE_RANGES = {
  EXCELLENT: { min: 90, max: 100, color: "#52c41a" },
  GOOD: { min: 75, max: 89, color: "#1890ff" },
  AVERAGE: { min: 60, max: 74, color: "#faad14" },
  POOR: { min: 0, max: 59, color: "#f5222d" },
} as const;

// Date Formats
export const DATE_FORMAT = "YYYY-MM-DD";
export const DISPLAY_DATE_FORMAT = "MMM DD, YYYY";

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  NAME_MIN: "Name must be at least 2 characters",
  FUTURE_DATE: "Date cannot be in the future",
  INVALID_EMAIL: "Please enter a valid email",
  PERFORMANCE_RANGE: "Score must be between 0 and 100",
} as const;

// Debounce Delays
export const DEBOUNCE_DELAY = 500; // ms