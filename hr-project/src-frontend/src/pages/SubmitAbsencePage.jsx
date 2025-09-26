import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitAbsence } from '../store/thunks/absencesThunk';
import { useNavigate } from 'react-router-dom';

function SubmitAbsencePage() {
  const [absenceData, setAbsenceData] = useState({
    absenceType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isUserLoggedIn === false) {
      navigate('/login');
    } else if (user.data.user.role !== 'employee') {
      alert('Only employees can submit absences.');
      navigate('/');
    }
  });

  const handleChange = (event) => {
    setAbsenceData({ ...absenceData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      submitAbsence({
        ...absenceData,
        user_id: user.data.user.id,
        user_email: user.data.user.email,
        user_role: user.data.user.role,
      }),
    );
    alert('Absence submitted! Thank you.');
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-20">
      <div className="flex flex-col justify-center items-center border-2 bg-white p-12 rounded-lg shadow-2xl gap-6">
        <h1 className="text-4xl font-bold mb-12">Absences Page</h1>
        <h2>Please submit your absence</h2>
        <div className="flex flex-col gap-6 justify-between items-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="absenceType">
              Absence Type:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="absenceType"
              name="absenceType"
              onChange={handleChange}
              value={absenceData.absenceType}
              required
            >
              <option value="" disabled hidden>
                Choose an option...
              </option>
              <option value="sick_leave">Sick Leave</option>
              <option value="vacation">Vacation</option>
              <option value="personal_leave">Personal Leave</option>
            </select>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              id="startDate"
              name="startDate"
              onChange={handleChange}
              required
            />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              End Date:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              id="endDate"
              name="endDate"
              onChange={handleChange}
              required
            />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
              Reason:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
              id="reason"
              name="reason"
              placeholder="Enter the reason for your absence"
              onChange={handleChange}
              required
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Submit Absence
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SubmitAbsencePage;
