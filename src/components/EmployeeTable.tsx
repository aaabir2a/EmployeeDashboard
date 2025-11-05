// components/EmployeeTable.tsx
import React from "react";
import { Table, Tag, Button, Space, Progress, Tooltip, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { Employee, PaginationState, SortState } from "../types/employee.types";
import { STATUS_COLORS, PAGE_SIZE_OPTIONS } from "../utils/constants";
import dayjs from "dayjs";

interface EmployeeTableProps {
  employees: Employee[];
  loading: boolean;
  pagination: PaginationState;
  onPaginationChange: (page: number, pageSize: number) => void;
  onEdit: (employee: Employee) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  showArchived: boolean;
  sortState: SortState;
  onSortChange: (field: string, order: "ascend" | "descend" | null) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  loading,
  pagination,
  onPaginationChange,
  onEdit,
  onArchive,
  onRestore,
  showArchived,
  sortState,
  onSortChange,
}) => {
  const getPerformanceColor = (score: number): string => {
    if (score >= 90) return "#52c41a";
    if (score >= 75) return "#1890ff";
    if (score >= 60) return "#faad14";
    return "#f5222d";
  };

  const columns: ColumnsType<Employee> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      sortOrder: sortState.field === "name" ? sortState.order : null,
      width: 200,
      fixed: "left",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      sorter: true,
      sortOrder: sortState.field === "department" ? sortState.order : null,
      width: 150,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 200,
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
      sorter: true,
      sortOrder: sortState.field === "joiningDate" ? sortState.order : null,
      width: 150,
      render: (date: string) => dayjs(date).format("MMM DD, YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status: Employee["status"]) => {
        const color = STATUS_COLORS[status];
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Performance",
      dataIndex: "performanceScore",
      key: "performanceScore",
      sorter: true,
      sortOrder: sortState.field === "performanceScore" ? sortState.order : null,
      width: 180,
      render: (score: number) => (
        <Tooltip title={`Score: ${score}/100`}>
          <Progress
            percent={score}
            strokeColor={getPerformanceColor(score)}
            size="small"
            format={(percent) => `${percent}`}
          />
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>

          {record.isArchived ? (
            <Popconfirm
              title="Restore Employee"
              description="Are you sure you want to restore this employee?"
              onConfirm={() => onRestore(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Restore">
                <Button type="text" icon={<UndoOutlined />} />
              </Tooltip>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Archive Employee"
              description="Are you sure you want to archive this employee?"
              onConfirm={() => onArchive(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Archive">
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  // Add archived tag column if showing archived
  if (showArchived) {
    columns.splice(5, 0, {
      title: "Archived",
      key: "isArchived",
      width: 100,
      render: (_, record) =>
        record.isArchived ? <Tag color="default">Archived</Tag> : null,
    });
  }

  const handleTableChange = (
    paginationConfig: TablePaginationConfig,
    _filters: any,
    sorter: any
  ) => {
    // Handle pagination
    if (paginationConfig.current && paginationConfig.pageSize) {
      onPaginationChange(paginationConfig.current, paginationConfig.pageSize);
    }

    // Handle sorting
    if (sorter.field) {
      onSortChange(sorter.field, sorter.order || null);
    } else {
      onSortChange("", null);
    }
  };

  return (
    <Table<Employee>
      columns={columns}
      dataSource={employees}
      loading={loading}
      rowKey="id"
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} employees`,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
      }}
      onChange={handleTableChange}
      bordered
      scroll={{ x: 1200 }}
    />
  );
};

export default EmployeeTable;