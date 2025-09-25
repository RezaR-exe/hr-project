import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitFeedback } from '../store/thunks/feedbackThunk';

function FeedbackPage() {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const [givenFeedback, setGivenFeedback] = useState({});

  const handleChange = (event) => {
    setGivenFeedback({ ...givenFeedback, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(
        submitFeedback({
          feedbackData: givenFeedback,
          employeeData: {
            user_id: user.user.id,
            user_email: user.user.email,
            user_role: user.user.role,
          },
        }),
      ).unwrap();
      if (response.success === false) {
        alert(response.message);
        return;
      }
      alert('Feedback submitted! Thank you for your input.');
    } catch (error) {
      console.log(error);
      alert('Only co-workers can submit feedback.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 mt-20">
        <div className="flex flex-col mt-20">
          <div className="flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-lg w-full">
            <h1 className="text-4xl font-bold mb-12">Feedback Page</h1>
            <h2>
              Hello, this is the feedback page, you can leave your feedback about our app in the
              sections below!
            </h2>
            <div className="flex flex-col gap-6 justify-between items-center bg-white p-8 rounded-lg shadow-lg w-full mt-6">
              <h2 className="text-2xl font-bold mb-4">Leave your feedback</h2>
              <h3 className="text-lg mb-2">
                Please choose a grade from 1 to 10 where 1 means unsatisfactory and 10 completely
                satisfactory.
              </h3>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                name="given_grade"
                value={givenFeedback.given_grade || ''}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Choose an option...
                </option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
              <h3 className="mt-4">You can also leave a comment below if you'd like:</h3>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                id="feedback"
                name="feedback"
                type="text"
                placeholder="Enter your feedback here..."
                onChange={handleChange}
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FeedbackPage;
