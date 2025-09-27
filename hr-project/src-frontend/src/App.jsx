/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import Dashboard from './pages/DashboardPage';
import Feedback from './pages/FeedbackPage';
import Absences from './pages/SubmitAbsencePage';
import Employee from './pages/EmployeePage';
import Profile from './pages/ProfilePage';
import NavigationBar from './components/NavigationBar';
import Feedbacks from './pages/ViewFeedbacksPage';
import AbsencesList from './pages/AbsencesPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchEmployees } from './store/thunks/employeesThunks';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchEmployees());
    if (user.isCurrentlyLoggedIn === false) {
      navigate('/login');
    }
  }, [dispatch, user]);

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/absences" element={<Absences />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user-absences-list" element={<AbsencesList />} />
      </Routes>
    </>
  );
}

export default App;
