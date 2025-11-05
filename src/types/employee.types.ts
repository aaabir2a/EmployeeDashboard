// types/employee.types.ts

export interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
  joiningDate: string;
  status: "Active" | "On Leave" | "Resigned";
  performanceScore: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFormData {
  name: string;
  department: string;
  role: string;
  joiningDate: string;
  status: "Active" | "On Leave" | "Resigned";
  performanceScore: number;
}

export interface FilterState {
  search: string;
  department: string | null;
  status: string | null;
  dateRange: [string, string] | null;
  showArchived: boolean;
}

export interface SortState {
  field: string;
  order: "ascend" | "descend" | null;
}

export type ViewMode = "table" | "card";

export interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}