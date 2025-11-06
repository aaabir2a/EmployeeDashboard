import "./App.css";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import { ConfigProvider, App as AntApp } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
        },
      }}
    >
      <AntApp>
        <EmployeeDashboard />
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
