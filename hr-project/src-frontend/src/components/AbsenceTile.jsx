/* eslint-disable react/prop-types */
import React from 'react';

function AbsenceTile(props) {
  return (
    <div className="flex flex-col justify-center items-center bg-white p-8 rounded-lg border-2 mb-4 w-full">
      <div className="flex justify-center flex-row items-center w-full gap-60">
        <h1 className="font-bold mb-4">{props.absence_id}</h1>
        <h1 className="font-bold mb-4">{props.absence_type}</h1>
        <h1 className="font-bold mb-4">{props.start_date}</h1>
        <h1 className="font-bold mb-4">{props.end_date}</h1>
        <h1 className="font-bold mb-4">{props.status}</h1>
      </div>
    </div>
  );
}

export default AbsenceTile;
