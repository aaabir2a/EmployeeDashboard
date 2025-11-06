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

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const createEmployee = useCallback(
    async (data: EmployeeFormData): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const newEmployee = await employeeApi.createEmployee(data);
        setEmployees((prev) => [...prev, newEmployee]);
        
        message.success(`Employee "${data.name}" added successfully!`);
        
        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to create employee";
        setError(errorMessage);
        
        message.error(errorMessage);
        
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateEmployee = useCallback(
    async (id: string, data: EmployeeFormData): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const updatedEmployee = await employeeApi.updateEmployee(id, data);
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === id ? updatedEmployee : emp))
        );
        
        message.success(`Employee "${data.name}" updated successfully!`);
        
        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to update employee";
        setError(errorMessage);
        
        message.error(errorMessage);
        
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

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
      
      message.success('Employee archived successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to archive employee";
      setError(errorMessage);
      
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

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
      
      message.success('Employee restored successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to restore employee";
      setError(errorMessage);
      
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

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