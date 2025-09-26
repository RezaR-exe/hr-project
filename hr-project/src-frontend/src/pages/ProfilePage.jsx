import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeData from '../components/EmployeeData';
import { fetchEmployeeFullData } from '../store/thunks/employeesThunks';
import { editEmployeeData } from '../store/thunks/employeesThunks';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [accssessedEmployeeData, setAccessedEmployeeData] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSaveData = (changedData) => {
    dispatch(
      editEmployeeData({
        employeeData: changedData,
        requestedUserId: user.data.user.id,
        requestedUserType: user.data.user.role,
      }),
    );
  };

  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        const response = await dispatch(
          fetchEmployeeFullData({
            employeeId: user.data.user.id,
            userType: user.data.user.role,
            currentlyLoggedEmployeeId: user.data.user.id,
          }),
        ).unwrap();
        setAccessedEmployeeData(response.user);
      } catch (error) {
        console.log(error);
      }
    };

    if (user.isUserLoggedIn === false) {
      navigate('/login');
    }
    loadEmployeeData();
  }, [dispatch, handleSaveData]);

  return (
    <div className="flex justify-center items-center min-h-screen mt-20">
      <div className="flex flex-col justify-center items-center border-2 bg-white p-12 rounded-lg shadow-2xl gap-6">
        <div className="flex w-full justify-between items-center gap-6">
          <h1 className="text-4xl font-bold mb-12">Profile Page</h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-6 justify-between items-center">
            <EmployeeData
              onSaveData={handleSaveData}
              id={accssessedEmployeeData.id}
              first_name={accssessedEmployeeData.first_name}
              last_name={accssessedEmployeeData.last_name}
              work_email={accssessedEmployeeData.work_email}
              user_type={accssessedEmployeeData.user_type}
              responsable_position={accssessedEmployeeData.responsable_position}
              department={accssessedEmployeeData.department}
              birth_date={accssessedEmployeeData.birth_date}
              salary={accssessedEmployeeData.salary}
              phone_number={accssessedEmployeeData.phone_number}
              home_address={accssessedEmployeeData.home_address}
              personal_email={accssessedEmployeeData.personal_email}
              absences_info={accssessedEmployeeData.absences_info}
              work_location={accssessedEmployeeData.work_location}
              hire_date={accssessedEmployeeData.hire_date}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
