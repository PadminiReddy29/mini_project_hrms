import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ForgotPassword from './ForgotPassword.jsx';
import Login from './Login.jsx'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import ResetPassword from './ResetPassword.jsx'
import Home from './Home.jsx'
import Leaves from './Leaves.jsx'
import Attendance from './Attendance.jsx';
import Team from './Team.jsx';
import DashboardLayout from './components/Dashboardlayout';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-pswd" element={<ForgotPassword />} />
    <Route path="/reset-pswd" element={<ResetPassword />} />
    <Route element={<DashboardLayout />}>
      <Route path="/home" element={<Home />} />
      <Route path="/team" element={<Team />} />
      <Route path="/leaves" element={<Leaves />} />
      <Route path="/attendance" element={<Attendance />} />
    </Route>
  </Routes>
</BrowserRouter>
  </StrictMode>,
)
