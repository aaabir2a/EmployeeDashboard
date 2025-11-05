import type { Employee, FilterState } from "../types/employee.types"

export const filterEmployees = (employees: Employee[], filters: FilterState): Employee[] => {
  return employees.filter((employee) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch =
        employee.name.toLowerCase().includes(searchLower) ||
        employee.email?.toLowerCase().includes(searchLower) ||
        employee.role.toLowerCase().includes(searchLower) ||
        employee.department.toLowerCase().includes(searchLower)

      if (!matchesSearch) return false
    }

    // Department filter
    if (filters.department) {
      if (employee.department !== filters.department) return false
    }

    // Status filter
    if (filters.status) {
      if (employee.status !== filters.status) return false
    }

    // Date range filter
    if (filters.dateRange) {
      const [startDate, endDate] = filters.dateRange
      const empDate = new Date(employee.joiningDate)
      const start = new Date(startDate)
      const end = new Date(endDate)

      if (empDate < start || empDate > end) return false
    }

    // Archive filter
    if (!filters.showArchived && employee.isArchived) {
      return false
    }

    return true
  })
}

export const sortEmployees = (
  employees: Employee[],
  sortField: string,
  sortOrder: "ascend" | "descend" | null,
): Employee[] => {
  if (!sortOrder) return employees

  const sorted = [...employees].sort((a, b) => {
    let aValue: any = a[sortField as keyof Employee]
    let bValue: any = b[sortField as keyof Employee]

    // Handle different data types
    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = (bValue as string).toLowerCase()
    }

    if (aValue < bValue) return sortOrder === "ascend" ? -1 : 1
    if (aValue > bValue) return sortOrder === "ascend" ? 1 : -1
    return 0
  })

  return sorted
}

export const getUniqueValues = (employees: Employee[], field: keyof Employee): string[] => {
  const values = employees.map((emp) => String(emp[field]))
  return [...new Set(values)].sort()
}

export const getFilteredAndSortedEmployees = (
  employees: Employee[],
  filters: FilterState,
  sortField: string,
  sortOrder: "ascend" | "descend" | null,
): Employee[] => {
  const filtered = filterEmployees(employees, filters)
  return sortEmployees(filtered, sortField, sortOrder)
}
