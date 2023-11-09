/* import { createBrowserRouter, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import Profile from '../pages/Profile';

import LoginForm from '../pages/login-form';
import SignupForm from '../pages/signup-form';
import { LandingPage } from '../pages/LandingPage';
import {AdminDashboard} from '../pages/admin/AdminDashboard';
import { ProtectedRoute } from '../pages/ProtectedRoute';
import {  BrowserRouter as Router, Route,  Routes} from 'react-router-dom';
import { ClientDashboard } from '../pages/client/ClientDashboard';



export const Test = () => {
    
  const {user, isAuthenticated} = useAuth();


  
  return (
      isAuthenticated ? (
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </Router>
      ) : 
      (<Router>
        <Routes>
          <Route path="/" element={<LoginForm/>} />
        </Routes>
      </Router>)
    );
  }; */