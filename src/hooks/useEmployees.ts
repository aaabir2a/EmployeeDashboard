"use client"

import { useState, useCallback, useEffect } from "react"
import type { Employee, EmployeeFormData } from "../types/employee.types"
import * as employeeApi from "../services/employeeApi"

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load employees on mount
  useEffect(() => {
    loadEmployees()
  }, [])

  const loadEmployees = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await employeeApi.fetchEmployees()
      setEmployees(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load employees")
    } finally {
      setLoading(false)
    }
  }, [])

  const createEmployee = useCallback(async (data: EmployeeFormData) => {
    try {
      const newEmployee = await employeeApi.createEmployee(data)
      setEmployees((prev) => [...prev, newEmployee])
      return newEmployee
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create employee"
      setError(message)
      throw err
    }
  }, [])

  const updateEmployee = useCallback(async (id: string, data: EmployeeFormData) => {
    try {
      const updated = await employeeApi.updateEmployee(id, data)
      setEmployees((prev) => prev.map((emp) => (emp.id === id ? updated : emp)))
      return updated
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update employee"
      setError(message)
      throw err
    }
  }, [])

  const archiveEmployee = useCallback(async (id: string) => {
    try {
      await employeeApi.archiveEmployee(id)
      setEmployees((prev) => prev.map((emp) => (emp.id === id ? { ...emp, isArchived: true } : emp)))
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to archive employee"
      setError(message)
      throw err
    }
  }, [])

  const restoreEmployee = useCallback(async (id: string) => {
    try {
      await employeeApi.restoreEmployee(id)
      setEmployees((prev) => prev.map((emp) => (emp.id === id ? { ...emp, isArchived: false } : emp)))
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to restore employee"
      setError(message)
      throw err
    }
  }, [])

  const deleteEmployee = useCallback(async (id: string) => {
    try {
      await employeeApi.deleteEmployee(id)
      setEmployees((prev) => prev.filter((emp) => emp.id !== id))
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete employee"
      setError(message)
      throw err
    }
  }, [])

  return {
    employees,
    loading,
    error,
    loadEmployees,
    createEmployee,
    updateEmployee,
    archiveEmployee,
    restoreEmployee,
    deleteEmployee,
  }
}
