import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import Dashboard from './pages/DashboardPage';
import Feedback from './pages/FeedbackPage';
import Absences from './pages/AbsencesPage';
import Employee from './pages/EmployeePage';
import NavigationBar from './components/NavigationBar';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
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
      </Routes>
    </Router>
  );
}

export default App;
