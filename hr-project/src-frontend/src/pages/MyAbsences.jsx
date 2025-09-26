import React from 'react';
import AbsenceTile from '../components/AbsenceTile';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAbsences } from '../store/thunks/absencesThunk';

function MyAbsences() {
  const [absenceData, setAbsenceData] = useState([]);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAbsenceData = async () => {
      const response = await dispatch(
        fetchAbsences({ user_id: user.user.id, user_role: user.user.role }),
      ).unwrap();
      setAbsenceData(response.absences);
    };
    loadAbsenceData();
  }, [dispatch, user]);

  const renderedAbsenceTiles = absenceData.map((absence) => (
    <AbsenceTile
      key={absence.id}
      absence_id={absence.id}
      absence_type={absence.absence_type}
      start_date={absence.absence_start_date}
      end_date={absence.absence_end_date}
      status={absence.status}
    />
  ));

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 mt-20">
      <div className="flex flex-col justify-center items-center border-2 bg-white p-12 rounded-lg shadow-2xl gap-6">
        <h1 className="text-4xl font-bold mb-12">My Absences Page</h1>
        {renderedAbsenceTiles}
      </div>
    </div>
  );
}

export default MyAbsences;
