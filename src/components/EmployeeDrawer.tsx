import React, { useEffect, useState } from "react";
import {
  Drawer,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  InputNumber,
  Divider,
} from "antd";
import { SaveOutlined, CheckCircleOutlined } from "@ant-design/icons";
import type { Employee, EmployeeFormData } from "../types/employee.types";
import {
  DEPARTMENTS,
  STATUS_OPTIONS,
  VALIDATION_MESSAGES,
} from "../utils/constants";
import dayjs from "dayjs";

const { Option } = Select;

interface EmployeeDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormData) => Promise<boolean>;
  employee: Employee | null;
  loading: boolean;
}

const EmployeeDrawer: React.FC<EmployeeDrawerProps> = ({
  open,
  onClose,
  onSubmit,
  employee,
  loading,
}) => {
  const [form] = Form.useForm();
  const [saveAndContinue, setSaveAndContinue] = useState(false);

  const isEditMode = !!employee;

  useEffect(() => {
    if (open && employee) {
      form.setFieldsValue({
        name: employee.name,
        department: employee.department,
        role: employee.role,
        joiningDate: dayjs(employee.joiningDate),
        status: employee.status,
        performanceScore: employee.performanceScore,
      });
    } else if (open && !employee) {
      form.resetFields();
    }
  }, [open, employee, form]);

  const handleSubmit = async (continueEditing: boolean = false) => {
    try {
      const values = await form.validateFields();
      const formData: EmployeeFormData = {
        ...values,
        joiningDate: values.joiningDate.format("YYYY-MM-DD"),
      };

      const success = await onSubmit(formData);

      if (success) {
        if (!continueEditing) {
          form.resetFields();
          onClose();
        } else {
          // Keep drawer open for save & continue
          setSaveAndContinue(true);
          setTimeout(() => setSaveAndContinue(false), 2000);
        }
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title={isEditMode ? "Edit Employee" : "Add New Employee"}
      open={open}
      onClose={handleClose}
      width={500}
      footer={
        <Space style={{ float: "right" }}>
          <Button onClick={handleClose}>Cancel</Button>

          {isEditMode && (
            <Button
              type="default"
              icon={<CheckCircleOutlined />}
              onClick={() => handleSubmit(true)}
              loading={loading && saveAndContinue}
            >
              Save & Continue
            </Button>
          )}

          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => handleSubmit(false)}
            loading={loading && !saveAndContinue}
          >
            {isEditMode ? "Update" : "Create"}
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          status: "Active",
          performanceScore: 75,
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: VALIDATION_MESSAGES.REQUIRED },
            { min: 2, message: VALIDATION_MESSAGES.NAME_MIN },
          ]}
        >
          <Input placeholder="Enter employee name" size="large" />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[{ required: true, message: VALIDATION_MESSAGES.REQUIRED }]}
        >
          <Select placeholder="Select department" size="large">
            {DEPARTMENTS.map((dept) => (
              <Option key={dept} value={dept}>
                {dept}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: VALIDATION_MESSAGES.REQUIRED }]}
        >
          <Input placeholder="Enter employee role" size="large" />
        </Form.Item>

        <Form.Item
          label="Joining Date"
          name="joiningDate"
          rules={[
            { required: true, message: VALIDATION_MESSAGES.REQUIRED },
            {
              validator: (_, value) => {
                if (value && value.isAfter(dayjs())) {
                  return Promise.reject(VALIDATION_MESSAGES.FUTURE_DATE);
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            size="large"
            format="YYYY-MM-DD"
            disabledDate={(current) =>
              current && current > dayjs().endOf("day")
            }
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: VALIDATION_MESSAGES.REQUIRED }]}
        >
          <Select placeholder="Select status" size="large">
            {STATUS_OPTIONS.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Divider />

        <Form.Item
          label="Performance Score (0-100)"
          name="performanceScore"
          rules={[
            { required: true, message: VALIDATION_MESSAGES.REQUIRED },
            {
              type: "number",
              min: 0,
              max: 100,
              message: VALIDATION_MESSAGES.PERFORMANCE_RANGE,
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            size="large"
            min={0}
            max={100}
            placeholder="Enter performance score"
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EmployeeDrawer;
