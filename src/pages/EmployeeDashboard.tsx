"use client"

// pages/EmployeeDashboard.tsx
import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { Layout, Spin, Alert } from "antd"
import EmployeeHeader from "../components/EmployeeHeader"
import EmployeeFilters from "../components/EmployeeFilters"
import EmployeeTable from "../components/EmployeeTable"
import EmployeeCardView from "../components/EmployeeCardView"
import EmployeeDrawer from "../components/EmployeeDrawer"
import EmptyState from "../components/EmptyState"
import { useEmployees } from "../hooks/useEmployees"
import { useDebounce } from "../hooks/useDebounce"
import { useLocalStorage } from "../hooks/useLocalStorage"
import type {
  Employee,
  EmployeeFormData,
  FilterState,
  PaginationState,
  SortState,
  ViewMode,
} from "../types/employee.types"
import { filterEmployees, sortEmployees } from "../utils/filterUtils"
import { DEFAULT_PAGE_SIZE, STORAGE_KEYS } from "../utils/constants"

const { Content } = Layout

const EmployeeDashboard: React.FC = () => {
  // Core data
  const {
    employees: allEmployees,
    loading: apiLoading,
    error,
    createEmployee,
    updateEmployee,
    archiveEmployee,
    restoreEmployee,
  } = useEmployees()

  // UI State
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>(STORAGE_KEYS.VIEW_MODE, "table")

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    department: null,
    status: null,
    dateRange: null,
    showArchived: false,
  })

  // Debounced search for performance
  const debouncedSearch = useDebounce(filters.search, 500)

  // Sort State (persisted)
  const [sortState, setSortState] = useLocalStorage<SortState>(STORAGE_KEYS.SORT, { field: "", order: null })

  // Pagination State (persisted)
  const [pagination, setPagination] = useLocalStorage<PaginationState>(STORAGE_KEYS.PAGINATION, {
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
  })

  // Apply filters and sorting
  const filteredAndSortedEmployees = useMemo(() => {
    const debouncedFilters = { ...filters, search: debouncedSearch }
    const filtered = filterEmployees(allEmployees, debouncedFilters)
    const sorted = sortEmployees(filtered, sortState.field, sortState.order)
    return sorted
  }, [allEmployees, debouncedSearch, filters, sortState])

  // Paginated employees for current view
  const paginatedEmployees = useMemo(() => {
    const startIndex = (pagination.current - 1) * pagination.pageSize
    const endIndex = startIndex + pagination.pageSize
    return filteredAndSortedEmployees.slice(startIndex, endIndex)
  }, [filteredAndSortedEmployees, pagination])

  // Update pagination total when filtered data changes
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: filteredAndSortedEmployees.length,
      current: 1, // Reset to first page when filters change
    }))
  }, [filteredAndSortedEmployees.length, setPagination])

  // Handlers
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const handleResetFilters = () => {
    setFilters({
      search: "",
      department: null,
      status: null,
      dateRange: null,
      showArchived: filters.showArchived, // Preserve archived toggle
    })
  }

  const handleToggleArchived = (checked: boolean) => {
    setFilters((prev) => ({ ...prev, showArchived: checked }))
  }

  const handleSortChange = (field: string, order: "ascend" | "descend" | null) => {
    setSortState({ field, order })
  }

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ ...pagination, current: page, pageSize })
  }

  const handleAddClick = () => {
    setSelectedEmployee(null)
    setDrawerOpen(true)
  }

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee)
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
    setSelectedEmployee(null)
  }

  const handleSubmit = async (data: EmployeeFormData): Promise<boolean> => {
    if (selectedEmployee) {
      return await updateEmployee(selectedEmployee.id, data)
    } else {
      return await createEmployee(data)
    }
  }

  const handleArchive = async (id: string) => {
    await archiveEmployee(id)
  }

  const handleRestore = async (id: string) => {
    await restoreEmployee(id)
  }

  // Determine what to show
  const showEmptyState = !apiLoading && allEmployees.length === 0 && !filters.showArchived
  const showNoResults = !apiLoading && allEmployees.length > 0 && filteredAndSortedEmployees.length === 0

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
          background: "#fff",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <EmployeeHeader
          onAddClick={handleAddClick}
          showArchived={filters.showArchived}
          onToggleArchived={handleToggleArchived}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Main Content */}
        <Content style={{ marginTop: 24 }}>
          {error && (
            <Alert message="Error" description={error} type="error" showIcon closable style={{ marginBottom: 16 }} />
          )}

          {/* Filters */}
          {!showEmptyState && (
            <div style={{ marginBottom: 24 }}>
              <EmployeeFilters filters={filters} onFilterChange={handleFilterChange} onReset={handleResetFilters} />
            </div>
          )}

          {/* Loading State */}
          {apiLoading && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <Spin size="large" tip="Loading employees..." />
            </div>
          )}

          {/* Empty State - No Data */}
          {showEmptyState && (
            <div style={{ padding: "60px 0" }}>
              <EmptyState type="no-data" onAddClick={handleAddClick} />
            </div>
          )}

          {/* Empty State - No Results */}
          {showNoResults && (
            <div style={{ padding: "60px 0" }}>
              <EmptyState type="no-results" onResetFilters={handleResetFilters} />
            </div>
          )}

          {/* Table/Card View */}
          {!apiLoading && !showEmptyState && !showNoResults && (
            <>
              {viewMode === "table" ? (
                <EmployeeTable
                  employees={paginatedEmployees}
                  loading={apiLoading}
                  pagination={pagination}
                  onPaginationChange={handlePaginationChange}
                  onEdit={handleEditClick}
                  onArchive={handleArchive}
                  onRestore={handleRestore}
                  showArchived={filters.showArchived}
                  sortState={sortState}
                  onSortChange={handleSortChange}
                />
              ) : (
                <EmployeeCardView
                  employees={paginatedEmployees}
                  loading={apiLoading}
                  pagination={pagination}
                  onPaginationChange={handlePaginationChange}
                  onEdit={handleEditClick}
                  onArchive={handleArchive}
                  onRestore={handleRestore}
                  showArchived={filters.showArchived}
                />
              )}
            </>
          )}
        </Content>
      </div>

      {/* Drawer for Add/Edit */}
      <EmployeeDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        onSubmit={handleSubmit}
        employee={selectedEmployee}
        loading={apiLoading}
      />
    </Layout>
  )
}

export default EmployeeDashboard
