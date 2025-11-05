// services/employeeApi.ts
import type { Employee, EmployeeFormData } from "../types/employee.types";

const STORAGE_KEY = "employees_data";
const DELAY = 800; // Simulate network delay

// Helper to simulate async operations
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Initialize with mock data if empty
const initializeMockData = (): Employee[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  const mockEmployees: Employee[] = [
    {
      id: "1",
      name: "Alice Johnson",
      department: "Engineering",
      role: "Senior Frontend Developer",
      joiningDate: "2023-03-10",
      status: "Active",
      performanceScore: 92,
      isArchived: false,
      createdAt: "2023-03-10T08:00:00Z",
      updatedAt: "2023-03-10T08:00:00Z",
    },
    {
      id: "2",
      name: "Bob Lee",
      department: "HR",
      role: "Recruiter",
      joiningDate: "2022-10-22",
      status: "On Leave",
      performanceScore: 78,
      isArchived: false,
      createdAt: "2022-10-22T08:00:00Z",
      updatedAt: "2022-10-22T08:00:00Z",
    },
    {
      id: "3",
      name: "Charlie Davis",
      department: "Finance",
      role: "Financial Analyst",
      joiningDate: "2021-05-15",
      status: "Active",
      performanceScore: 88,
      isArchived: false,
      createdAt: "2021-05-15T08:00:00Z",
      updatedAt: "2021-05-15T08:00:00Z",
    },
    {
      id: "4",
      name: "Diana Martinez",
      department: "Engineering",
      role: "Backend Developer",
      joiningDate: "2023-08-01",
      status: "Active",
      performanceScore: 95,
      isArchived: false,
      createdAt: "2023-08-01T08:00:00Z",
      updatedAt: "2023-08-01T08:00:00Z",
    },
    {
      id: "5",
      name: "Ethan Brown",
      department: "Marketing",
      role: "Marketing Manager",
      joiningDate: "2020-02-10",
      status: "Resigned",
      performanceScore: 65,
      isArchived: true,
      createdAt: "2020-02-10T08:00:00Z",
      updatedAt: "2024-11-01T08:00:00Z",
    },
    {
      id: "6",
      name: "Fiona Chen",
      department: "HR",
      role: "HR Manager",
      joiningDate: "2019-11-20",
      status: "Active",
      performanceScore: 90,
      isArchived: false,
      createdAt: "2019-11-20T08:00:00Z",
      updatedAt: "2019-11-20T08:00:00Z",
    },
    {
      id: "7",
      name: "George Wilson",
      department: "Engineering",
      role: "DevOps Engineer",
      joiningDate: "2022-07-14",
      status: "Active",
      performanceScore: 85,
      isArchived: false,
      createdAt: "2022-07-14T08:00:00Z",
      updatedAt: "2022-07-14T08:00:00Z",
    },
    {
      id: "8",
      name: "Hannah Taylor",
      department: "Finance",
      role: "Accountant",
      joiningDate: "2023-01-09",
      status: "On Leave",
      performanceScore: 72,
      isArchived: false,
      createdAt: "2023-01-09T08:00:00Z",
      updatedAt: "2023-01-09T08:00:00Z",
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEmployees));
  return mockEmployees;
};

// Get all employees
export const fetchEmployees = async (): Promise<Employee[]> => {
  await delay(DELAY);
  return initializeMockData();
};

// Create new employee
export const createEmployee = async (
  data: EmployeeFormData
): Promise<Employee> => {
  await delay(DELAY);

  const employees = initializeMockData();
  const newEmployee: Employee = {
    id: Date.now().toString(),
    ...data,
    isArchived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  employees.push(newEmployee);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));

  return newEmployee;
};

// Update employee
export const updateEmployee = async (
  id: string,
  data: EmployeeFormData
): Promise<Employee> => {
  await delay(DELAY);

  const employees = initializeMockData();
  const index = employees.findIndex((emp) => emp.id === id);

  if (index === -1) {
    throw new Error("Employee not found");
  }

  const updatedEmployee: Employee = {
    ...employees[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  employees[index] = updatedEmployee;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));

  return updatedEmployee;
};

// Soft delete (archive)
export const archiveEmployee = async (id: string): Promise<void> => {
  await delay(DELAY);

  const employees = initializeMockData();
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    throw new Error("Employee not found");
  }

  employee.isArchived = true;
  employee.updatedAt = new Date().toISOString();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};

// Restore archived employee
export const restoreEmployee = async (id: string): Promise<void> => {
  await delay(DELAY);

  const employees = initializeMockData();
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    throw new Error("Employee not found");
  }

  employee.isArchived = false;
  employee.updatedAt = new Date().toISOString();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};

// Hard delete (optional - for cleanup)
export const deleteEmployee = async (id: string): Promise<void> => {
  await delay(DELAY);

  const employees = initializeMockData();
  const filtered = employees.filter((emp) => emp.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};