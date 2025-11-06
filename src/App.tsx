

import './App.css'
import EmployeeDashboard from './pages/EmployeeDashboard'
import {  message } from 'antd';

// Configure message globally
message.config({
  top: 100,
  duration: 3,
  maxCount: 3,
});

function App() {


  return (
    <>
      <EmployeeDashboard />
    </>
  )
}

export default App
