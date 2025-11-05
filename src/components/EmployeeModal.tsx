
import { Modal, Form, Input, Select, DatePicker, Space, Button } from "antd";

const { Option } = Select;

interface EmployeeModal {
    isOpenAddModal : boolean;
    setIsOpenAddModal: (v: boolean)=> void;
}

const EmployeeModal = ({isOpenAddModal, setIsOpenAddModal}: EmployeeModal) => (
  <Modal 
    onCancel    = {()=> setIsOpenAddModal(false)} 
    title       = "Add / Edit Employee" 
    open        = {isOpenAddModal} 
    footer={
      <Space style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => setIsOpenAddModal(false)}>Cancel</Button>
        <Button type="primary" onClick={() => console.log("Save clicked")}>
          Save
        </Button>
      </Space>
    }
>
    <Form layout="vertical">
      <Form.Item label="Name" name="name">
        <Input placeholder="Enter employee name" />
      </Form.Item>
      <Form.Item label="Department" name="department">
        <Select placeholder="Select department">
          <Option value="Engineering">Engineering</Option>
          <Option value="HR">HR</Option>
          <Option value="Finance">Finance</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Role" name="role">
        <Input placeholder="Enter employee role" />
      </Form.Item>
      <Form.Item label="Joining Date" name="joiningDate">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Status" name="status">
        <Select placeholder="Select status">
          <Option value="Active">Active</Option>
          <Option value="On Leave">On Leave</Option>
          <Option value="Resigned">Resigned</Option>
        </Select>
      </Form.Item>
    </Form>
  </Modal>
);

export default EmployeeModal;
