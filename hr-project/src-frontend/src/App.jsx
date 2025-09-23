import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import Employees from "./pages/EmployeesPage";
import Feedback from "./pages/FeedbackPage";
import Absences from "./pages/AbsencesPage";



function App() {
    const user = null; // replace with Redux selector later\

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/absences" element={<Absences />} />

                {/* Protect dashboard routes */}
            {/* <Route
          path="/dashboard/*"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
              /> */}
            </Routes>
        </Router>
    )
}

export default App;