/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';

function AbsenceTile(props) {
  const user = useSelector((state) => state.user.data);

  const handleAbsenceStatusChange = (event) => {
    props.onAbsenceUpdate({
      absence_id: props.absence_id,
      new_status: event.target.name,
      user_role: user.user?.role,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white p-8 rounded-lg border-2 mb-4 w-full">
      <div className="flex justify-center flex-row items-center w-full gap-60">
        {/* <h1 className="font-bold mb-4">{props.absence_id}</h1> */}
        <h1 className="font-bold mb-4">{props.absence_type}</h1>
        <h1 className="font-bold mb-4">{props.start_date}</h1>
        <h1 className="font-bold mb-4">{props.end_date}</h1>
        <h1 className="font-bold mb-4">{props.status}</h1>
        <div className="flex flex-row gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            style={{ display: user.user?.role === 'manager' ? 'block' : 'none' }}
            name="approved"
            onClick={handleAbsenceStatusChange}
          >
            Approve
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            style={{ display: user.user?.role === 'manager' ? 'block' : 'none' }}
            name="declined"
            onClick={handleAbsenceStatusChange}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default AbsenceTile;
