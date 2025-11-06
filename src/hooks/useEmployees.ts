// hooks/useEmployees.ts
import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import type { Employee, EmployeeFormData } from "../types/employee.types";
import * as employeeApi from "../services/employeeApi";

interface UseEmployeesReturn {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  createEmployee: (data: EmployeeFormData) => Promise<boolean>;
  updateEmployee: (id: string, data: EmployeeFormData) => Promise<boolean>;
  archiveEmployee: (id: string) => Promise<void>;
  restoreEmployee: (id: string) => Promise<void>;
  refreshEmployees: () => Promise<void>;
}

export const useEmployees = (): UseEmployeesReturn => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all employees
  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await employeeApi.fetchEmployees();
      setEmployees(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch employees";
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Create employee
  const createEmployee = useCallback(
    async (data: EmployeeFormData): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const newEmployee = await employeeApi.createEmployee(data);
        setEmployees((prev) => [...prev, newEmployee]);
        
        // Show success message
        message.success({
          content: `Employee "${data.name}" added successfully!`,
          duration: 3,
        });
        
        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to create employee";
        setError(errorMessage);
        
        // Show error message
        message.error({
          content: errorMessage,
          duration: 4,
        });
        
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Update employee
  const updateEmployee = useCallback(
    async (id: string, data: EmployeeFormData): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const updatedEmployee = await employeeApi.updateEmployee(id, data);
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === id ? updatedEmployee : emp))
        );
        
        // Show success message
        message.success({
          content: `Employee "${data.name}" updated successfully!`,
          duration: 3,
        });
        
        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to update employee";
        setError(errorMessage);
        
        // Show error message
        message.error({
          content: errorMessage,
          duration: 4,
        });
        
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Archive employee (soft delete)
  const archiveEmployee = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await employeeApi.archiveEmployee(id);
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === id ? { ...emp, isArchived: true } : emp
        )
      );
      
      // Show success message
      message.success({
        content: "Employee archived successfully!",
        duration: 3,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to archive employee";
      setError(errorMessage);
      
      // Show error message
      message.error({
        content: errorMessage,
        duration: 4,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Restore archived employee
  const restoreEmployee = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await employeeApi.restoreEmployee(id);
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === id ? { ...emp, isArchived: false } : emp
        )
      );
      
      // Show success message
      message.success({
        content: "Employee restored successfully!",
        duration: 3,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to restore employee";
      setError(errorMessage);
      
      // Show error message
      message.error({
        content: errorMessage,
        duration: 4,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh employees (manual reload)
  const refreshEmployees = useCallback(async () => {
    await fetchEmployees();
  }, [fetchEmployees]);

  return {
    employees,
    loading,
    error,
    createEmployee,
    updateEmployee,
    archiveEmployee,
    restoreEmployee,
    refreshEmployees,
  };
};