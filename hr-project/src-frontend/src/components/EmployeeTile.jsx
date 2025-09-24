import { Navigate } from 'react-router-dom';
import React from 'react';

function EmployeeTile(props) {
  const handleClick = () => {
    Navigate('/employees');
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white p-8 rounded-lg border-2 mb-4 w-full clickable hover:bg-gray-100">
      <div className="flex flex-row items-center w-full gap-60 mb-10" onClick={handleClick}>
        <h1 className="font-bold mb-4">{props.employee_id}</h1>
        <h1 className="font-bold mb-4">{props.first_name}</h1>
        <h1 className="font-bold mb-4">{props.last_name}</h1>
        <h1 className="font-bold mb-4">{props.work_email}</h1>
      </div>
    </div>
  );
}

export default EmployeeTile;
