/* eslint-disable react/prop-types */
import React from 'react';
import { useState, useEffect } from 'react';

function EmployeeData(props) {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({ id: props.id });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSaveData(editedData);
    setEditMode(false);
    setEditedData({ id: props.id });
  };

  const handleEditData = (event) => {
    setEditedData({ ...editedData, [event.target.name]: event.target.value });
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    setEditedData((prev) => ({ ...prev, id: props.id }));
  }, [props.id]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 justify-between items-center max-w-4xl flex-wrap">
        {editMode ? (
          <div className="flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save
            </button>
            <button
              onClick={handleEditClick}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleEditClick}
          >
            Edit
          </button>
        )}
        <h2 style={{ display: props.id ? 'block' : 'none' }}>Employee id: {props.id}</h2>
        <h2 style={{ display: props.user_type ? 'block' : 'none' }}>
          User Type: {props.user_type}
        </h2>
        <h2 style={{ display: props.first_name ? 'block' : 'none' }}>
          First Name: {props.first_name}
        </h2>
        <h2 style={{ display: props.last_name ? 'block' : 'none' }}>
          Last Name: {props.last_name}
        </h2>
        <h2 style={{ display: props.work_email ? 'block' : 'none' }}>
          Work Email:{' '}
          {editMode ? (
            <input name="work_email" onChange={handleEditData} defaultValue={props.work_email} />
          ) : (
            props.work_email
          )}
        </h2>
        <h2 style={{ display: props.responsable_position ? 'block' : 'none' }}>
          Responsable Position:{' '}
          {editMode ? (
            <input
              defaultValue={props.responsable_position}
              name="responsable_position"
              onChange={handleEditData}
            />
          ) : (
            props.responsable_position
          )}
        </h2>
        <h2 style={{ display: props.department ? 'block' : 'none' }}>
          Department:{' '}
          {editMode ? (
            <input defaultValue={props.department} name="department" onChange={handleEditData} />
          ) : (
            props.department
          )}
        </h2>
        <h2 style={{ display: props.birth_date ? 'block' : 'none' }}>
          Birth Date: {props.birth_date}
        </h2>
        <h2 style={{ display: props.salary ? 'block' : 'none' }}>
          Salary:{' '}
          {editMode ? (
            <input defaultValue={props.salary} name="salary" onChange={handleEditData} />
          ) : (
            props.salary
          )}
        </h2>
        <h2 style={{ display: props.phone_number ? 'block' : 'none' }}>
          Phone Number:{' '}
          {editMode ? (
            <input
              defaultValue={props.phone_number}
              name="phone_number"
              onChange={handleEditData}
            />
          ) : (
            props.phone_number
          )}
        </h2>
        <h2 style={{ display: props.home_address ? 'block' : 'none' }}>
          Home Address:{' '}
          {editMode ? (
            <input
              defaultValue={props.home_address}
              name="home_address"
              onChange={handleEditData}
            />
          ) : (
            props.home_address
          )}
        </h2>
        <h2 style={{ display: props.personal_email ? 'block' : 'none' }}>
          Personal Email:{' '}
          {editMode ? (
            <input
              defaultValue={props.personal_email}
              name="personal_email"
              onChange={handleEditData}
            />
          ) : (
            props.personal_email
          )}
        </h2>
        <h2 style={{ display: props.absences_info ? 'block' : 'none' }}>
          Absences Info:{' '}
          {editMode ? (
            <input
              defaultValue={props.absences_info}
              name="absences_info"
              onChange={handleEditData}
            />
          ) : (
            props.absences_info
          )}
        </h2>
        <h2 style={{ display: props.work_location ? 'block' : 'none' }}>
          Work Location:{' '}
          {editMode ? (
            <input
              defaultValue={props.work_location}
              name="work_location"
              onChange={handleEditData}
            />
          ) : (
            props.work_location
          )}
        </h2>
        <h2 className=""></h2>
        <h2 style={{ display: props.hire_date ? 'block' : 'none' }}>
          Hire Date: {props.hire_date}
        </h2>
      </div>
    </form>
  );
}

export default EmployeeData;
