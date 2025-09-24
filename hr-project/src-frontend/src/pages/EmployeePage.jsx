import React from 'react';

function EmployeePage() {
  return (
    <div className="flex justify-center items-center min-h-screen mt-20">
      <div className="flex flex-col justify-center items-center border-2 bg-white p-12 rounded-lg shadow-2xl gap-6">
        <h1 className="text-4xl font-bold">Employee Page</h1>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row gap-6 justify-between items-center">
            <h2>name</h2>:<h2>andrei</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;
