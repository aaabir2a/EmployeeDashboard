// components/EmployeeHeader.tsx
import React from "react";
import { Typography, Button, Space, Switch, Tooltip } from "antd";
import { PlusOutlined, TableOutlined, AppstoreOutlined } from "@ant-design/icons";
import type { ViewMode } from "../types/employee.types";


const { Title } = Typography;

interface EmployeeHeaderProps {
  onAddClick: () => void;
  showArchived: boolean;
  onToggleArchived: (checked: boolean) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const EmployeeHeader: React.FC<EmployeeHeaderProps> = ({
  onAddClick,
  showArchived,
  onToggleArchived,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 16,
        borderBottom: "1px solid #f0f0f0",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <Title level={3} style={{ margin: 0 }}>
        Employee Management
      </Title>

      <Space size="middle" wrap>
        <Space>
          <span style={{ color: "#666" }}>View:</span>
          <Button.Group>
            <Tooltip title="Table View">
              <Button
                type={viewMode === "table" ? "primary" : "default"}
                icon={<TableOutlined />}
                onClick={() => onViewModeChange("table")}
              />
            </Tooltip>
            <Tooltip title="Card View">
              <Button
                type={viewMode === "card" ? "primary" : "default"}
                icon={<AppstoreOutlined />}
                onClick={() => onViewModeChange("card")}
              />
            </Tooltip>
          </Button.Group>
        </Space>

        <Space>
          <span style={{ color: "#666" }}>Show Archived:</span>
          <Switch checked={showArchived} onChange={onToggleArchived} />
        </Space>

        <Button type="primary" icon={<PlusOutlined />} onClick={onAddClick}>
          Add Employee
        </Button>
      </Space>
    </div>
  );
};

export default EmployeeHeader;