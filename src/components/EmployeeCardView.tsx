// components/EmployeeCardView.tsx
import React from "react";
import {
  Card,
  Row,
  Col,
  Tag,
  Button,
  Space,
  Progress,
  Tooltip,
  Pagination,
  Popconfirm,
  Typography,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UndoOutlined,
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { Employee, PaginationState } from "../types/employee.types";
import { STATUS_COLORS, PAGE_SIZE_OPTIONS } from "../utils/constants";
import dayjs from "dayjs";

const { Text, Title } = Typography;

interface EmployeeCardViewProps {
  employees: Employee[];
  loading: boolean;
  pagination: PaginationState;
  onPaginationChange: (page: number, pageSize: number) => void;
  onEdit: (employee: Employee) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  showArchived: boolean;
}

const EmployeeCardView: React.FC<EmployeeCardViewProps> = ({
  employees,
  loading,
  pagination,
  onPaginationChange,
  onEdit,
  onArchive,
  onRestore,
  showArchived,
}) => {
  const getPerformanceColor = (score: number): string => {
    if (score >= 90) return "#52c41a";
    if (score >= 75) return "#1890ff";
    if (score >= 60) return "#faad14";
    return "#f5222d";
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {employees.map((employee) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={employee.id}>
            <Card
              loading={loading}
              hoverable
              style={{
                height: "100%",
                opacity: employee.isArchived ? 0.7 : 1,
              }}
              actions={[
                <Tooltip title="Edit" key="edit">
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(employee)}
                  />
                </Tooltip>,
                employee.isArchived ? (
                  <Popconfirm
                    key="restore"
                    title="Restore Employee"
                    description="Are you sure you want to restore this employee?"
                    onConfirm={() => onRestore(employee.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tooltip title="Restore">
                      <Button type="text" icon={<UndoOutlined />} />
                    </Tooltip>
                  </Popconfirm>
                ) : (
                  <Popconfirm
                    key="archive"
                    title="Archive Employee"
                    description="Are you sure you want to archive this employee?"
                    onConfirm={() => onArchive(employee.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tooltip title="Archive">
                      <Button type="text" danger icon={<DeleteOutlined />} />
                    </Tooltip>
                  </Popconfirm>
                ),
              ]}
            >
              <Space direction="vertical" style={{ width: "100%" }} size="middle">
                {/* Name & Status */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Title level={5} style={{ margin: 0 }}>
                    {employee.name}
                  </Title>
                  <Tag color={STATUS_COLORS[employee.status]}>
                    {employee.status}
                  </Tag>
                </div>

                {/* Role */}
                <Space>
                  <UserOutlined style={{ color: "#888" }} />
                  <Text type="secondary">{employee.role}</Text>
                </Space>

                {/* Department */}
                <Space>
                  <TeamOutlined style={{ color: "#888" }} />
                  <Text>{employee.department}</Text>
                </Space>

                {/* Joining Date */}
                <Space>
                  <CalendarOutlined style={{ color: "#888" }} />
                  <Text type="secondary">
                    {dayjs(employee.joiningDate).format("MMM DD, YYYY")}
                  </Text>
                </Space>

                {/* Performance Score */}
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Performance Score
                  </Text>
                  <Progress
                    percent={employee.performanceScore}
                    strokeColor={getPerformanceColor(employee.performanceScore)}
                    size="small"
                    format={(percent) => `${percent}/100`}
                  />
                </div>

                {/* Archived Tag */}
                {employee.isArchived && showArchived && (
                  <Tag color="default">Archived</Tag>
                )}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div style={{ marginTop: 24, textAlign: "right" }}>
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={onPaginationChange}
          showSizeChanger
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} employees`}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
        />
      </div>
    </>
  );
};

export default EmployeeCardView;