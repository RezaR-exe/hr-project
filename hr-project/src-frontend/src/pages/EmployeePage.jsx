import React from 'react';
import { useLocation } from 'react-router-dom';
import EmployeeData from '../components/EmployeeData';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEmployeeFullData } from '../store/thunks/employeesThunks';

function EmployeePage() {
  const [localEmployee, setLocalEmployee] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const employee = location.state.employeeObject;

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await dispatch(
          fetchEmployeeFullData({
            employeeId: employee.employee_id,
            userType: user.data.user.role,
            currentlyLoggedEmployeeId: user.data.user.id,
          }),
        ).unwrap();
        setLocalEmployee(response.user);
      } catch (error) {
        console.log(error);
      }
    };
    loadEmployees();
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen mt-20">
      <div className="flex flex-col justify-center items-center border-2 bg-white p-12 rounded-lg shadow-2xl gap-6">
        <h1 className="text-4xl font-bold mb-12">Employee Page</h1>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-6 justify-between items-center">
            <EmployeeData
              id={localEmployee.id}
              first_name={localEmployee.first_name}
              last_name={localEmployee.last_name}
              work_email={localEmployee.work_email}
              user_type={localEmployee.user_type}
              responsable_position={localEmployee.responsable_position}
              department={localEmployee.department}
              birth_date={localEmployee.birth_date}
              salary={localEmployee.salary}
              phone_number={localEmployee.phone_number}
              home_address={localEmployee.home_address}
              personal_email={localEmployee.personal_email}
              absences_info={localEmployee.absences_info}
              work_location={localEmployee.work_location}
              hire_date={localEmployee.hire_date}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;
