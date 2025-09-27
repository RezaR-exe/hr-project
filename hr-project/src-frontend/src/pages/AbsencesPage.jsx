/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import AbsenceTile from '../components/AbsenceTile';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAbsences } from '../store/thunks/absencesThunk';
import { useNavigate } from 'react-router-dom';
import { changeAbsenceStatus } from '../store/thunks/absencesThunk';

function AbsencesPage() {
  const [absenceUpdated, setAbsenceUpdated] = useState(false);
  const [absenceData, setAbsenceData] = useState([]);
  const [totalAbsences, setTotalAbsences] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
  const dispatch = useDispatch();

  const handleAbsenceClick = (event) => {
    event.target.name === 'total-absences' ? setTotalAbsences(true) : setTotalAbsences(false);
  };

  const handleAbsenceUpdate = (payload) => {
    dispatch(changeAbsenceStatus(payload));
    setAbsenceUpdated(!absenceUpdated);
  };

  useEffect(() => {
    if (isUserLoggedIn === false) {
      navigate('/login');
    }

    const loadAbsenceData = async () => {
      const response = await dispatch(
        fetchAbsences({ user_id: user.user?.id, user_role: user.user?.role }),
      ).unwrap();
      setAbsenceData(response.absences);
    };
    loadAbsenceData();
  }, [dispatch, user, isUserLoggedIn, absenceUpdated]);

  const renderedAbsenceTiles = absenceData.map((absence) =>
    totalAbsences ? (
      <AbsenceTile
        onAbsenceUpdate={handleAbsenceUpdate}
        key={absence.id}
        absence_id={absence.id}
        absence_type={absence.absence_type}
        start_date={absence.absence_start_date}
        end_date={absence.absence_end_date}
        status={absence.status}
      />
    ) : user?.user?.id === absence.requested_user_id ? (
      <AbsenceTile
        key={absence.id}
        absence_id={absence.id}
        absence_type={absence.absence_type}
        start_date={absence.absence_start_date}
        end_date={absence.absence_end_date}
        status={absence.status}
      />
    ) : (
      ''
    ),
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 mt-20">
      <div className="flex flex-col justify-center items-center border-2 bg-white p-12 rounded-lg shadow-2xl gap-6">
        <div className="flex w-full justify-between items-center gap-6">
          <h1 className="text-4xl font-bold mb-12">Absences Page</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            style={{ display: user.user?.role === 'manager' ? 'block' : 'none' }}
            name="my-absences"
            onClick={handleAbsenceClick}
          >
            My Absences
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            style={{ display: user.user?.role === 'manager' ? 'block' : 'none' }}
            name="total-absences"
            onClick={handleAbsenceClick}
          >
            Total active absences
          </button>
        </div>

        {renderedAbsenceTiles}
      </div>
    </div>
  );
}

export default AbsencesPage;
