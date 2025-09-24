/* eslint-disable react/prop-types */
import React from 'react';

function EmployeeData(props) {
  return (
    <div className="flex flex-row gap-6 justify-between items-center max-w-4xl flex-wrap">
      <h2 style={{ display: props.id ? 'block' : 'none' }}>Employee id: {props.id}</h2>
      <h2 style={{ display: props.user_type ? 'block' : 'none' }}>User Type: {props.user_type}</h2>
      <h2 style={{ display: props.first_name ? 'block' : 'none' }}>
        First Name: {props.first_name}
      </h2>
      <h2 style={{ display: props.last_name ? 'block' : 'none' }}>Last Name: {props.last_name}</h2>
      <h2 style={{ display: props.work_email ? 'block' : 'none' }}>
        Work Email: {props.work_email}
      </h2>
      <h2 style={{ display: props.responsable_position ? 'block' : 'none' }}>
        Responsable Position: {props.responsable_position}
      </h2>
      <h2 style={{ display: props.department ? 'block' : 'none' }}>
        Department: {props.department}
      </h2>
      <h2 style={{ display: props.birth_date ? 'block' : 'none' }}>
        Birth Date: {props.birth_date}
      </h2>
      <h2 style={{ display: props.salary ? 'block' : 'none' }}>Salary: {props.salary}</h2>
      <h2 style={{ display: props.phone_number ? 'block' : 'none' }}>
        Phone Number: {props.phone_number}
      </h2>
      <h2 style={{ display: props.home_address ? 'block' : 'none' }}>
        Home Address: {props.home_address}
      </h2>
      <h2 style={{ display: props.personal_email ? 'block' : 'none' }}>
        Personal Email: {props.personal_email}
      </h2>
      <h2 style={{ display: props.absences_info ? 'block' : 'none' }}>
        Absences Info: {props.absences_info}
      </h2>
      <h2 style={{ display: props.work_location ? 'block' : 'none' }}>
        Work Location: {props.work_location}
      </h2>
      <h2 style={{ display: props.hire_date ? 'block' : 'none' }}>Hire Date: {props.hire_date}</h2>
    </div>
  );
}

export default EmployeeData;
