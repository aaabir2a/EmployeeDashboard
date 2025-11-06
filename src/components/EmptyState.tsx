// components/EmptyState.tsx
import React from "react";
import { Empty, Button, Space, Typography } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface EmptyStateProps {
  type: "no-data" | "no-results";
  onAddClick?: () => void;
  onResetFilters?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  onAddClick,
  onResetFilters,
}) => {
  if (type === "no-data") {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        styles={{ image: { height: 120 } }}
        description={
          <Space direction="vertical" size="small">
            <Text strong style={{ fontSize: 16 }}>
              No Employees Yet
            </Text>
            <Text type="secondary">
              Get started by adding your first employee to the system
            </Text>
          </Space>
        }
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={onAddClick}
        >
          Add Your First Employee
        </Button>
      </Empty>
    );
  }

  // no-results
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      styles={{ image: { height: 120 } }}
      description={
        <Space direction="vertical" size="small">
          <Text strong style={{ fontSize: 16 }}>
            No Results Found
          </Text>
          <Text type="secondary">
            No employees match your current filters. Try adjusting your search
            criteria.
          </Text>
        </Space>
      }
    >
      <Button
        type="primary"
        icon={<SearchOutlined />}
        size="large"
        onClick={onResetFilters}
      >
        Clear All Filters
      </Button>
    </Empty>
  );
};

export default EmptyState;
