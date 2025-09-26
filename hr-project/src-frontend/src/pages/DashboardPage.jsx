import EmployeeTile from '../components/EmployeeTile';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { fetchEmployees } from '../store/thunks/employeesThunks';

function DashboardPage() {
  const employees = useSelector((state) => state.employees);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isUserLoggedIn === false) {
      navigate('/login');
    }

    dispatch(fetchEmployees());
  }, [user, dispatch]);

  const renderedEmployees = employees.data.map((employee) => {
    return (
      <EmployeeTile
        key={employee.id}
        employee_id={employee.id}
        first_name={employee.first_name}
        last_name={employee.last_name}
        work_email={employee.work_email}
      />
    );
  });

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 mt-20">
      <div className="flex flex-col mt-20">
        <div className="flex flex-row justify-center items-center bg-white p-8 rounded-t-lg shadow-lg gap-60">
          <h2 className="text-xl font-bold">Employee Id</h2>
          <h2 className="text-xl font-bold">First Name</h2>
          <h2 className="text-xl font-bold">Last Name</h2>
          <h2 className="text-xl font-bold">Work Email</h2>
        </div>
        <div className="flex flex-col justify-center items-center bg-white p-8 rounded-b-lg shadow-lg w-full">
          {renderedEmployees}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
