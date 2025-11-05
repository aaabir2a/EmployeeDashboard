// components/EmployeeFilters.tsx
import React from "react";
import { Space, Input, Select, Button, DatePicker } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import type { FilterState } from "../types/employee.types";
import { DEPARTMENTS, STATUS_OPTIONS } from "../utils/constants";
import dayjs from "dayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface EmployeeFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
}

const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  const handleDepartmentChange = (value: string | null) => {
    onFilterChange({ department: value });
  };

  const handleStatusChange = (value: string | null) => {
    onFilterChange({ status: value });
  };

  const handleDateRangeChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    if (dates && dates[0] && dates[1]) {
      onFilterChange({
        dateRange: [dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD")],
      });
    } else {
      onFilterChange({ dateRange: null });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <Space wrap>
        <Input
          placeholder="Search employee..."
          prefix={<SearchOutlined />}
          style={{ width: 240 }}
          allowClear
          value={filters.search}
          onChange={handleSearchChange}
        />

        <Select
          placeholder="Department"
          allowClear
          style={{ width: 180 }}
          suffixIcon={<FilterOutlined />}
          value={filters.department}
          onChange={handleDepartmentChange}
        >
          {DEPARTMENTS.map((dept) => (
            <Option key={dept} value={dept}>
              {dept}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Status"
          allowClear
          style={{ width: 160 }}
          suffixIcon={<FilterOutlined />}
          value={filters.status}
          onChange={handleStatusChange}
        >
          {STATUS_OPTIONS.map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>

        <RangePicker
          placeholder={["Start Date", "End Date"]}
          style={{ width: 260 }}
          value={
            filters.dateRange
              ? [dayjs(filters.dateRange[0]), dayjs(filters.dateRange[1])]
              : null
          }
          onChange={handleDateRangeChange}
          allowClear
        />
      </Space>

      <Button icon={<ReloadOutlined />} type="default" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
};

export default EmployeeFilters;