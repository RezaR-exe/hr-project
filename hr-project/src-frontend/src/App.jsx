import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import Dashboard from './pages/DashboardPage';
import Feedback from './pages/FeedbackPage';
import Absences from './pages/AbsencesPage';
import Employee from './pages/EmployeePage';
import Profile from './pages/ProfilePage';
import NavigationBar from './components/NavigationBar';
import Feedbacks from './pages/ViewFeedbacksPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchEmployees } from './store/thunks/employeesThunks';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/absences" element={<Absences />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
