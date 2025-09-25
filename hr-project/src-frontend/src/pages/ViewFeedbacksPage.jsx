import React from 'react';

function ViewFeedbacksPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center border-2 bg-white p-12 rounded-lg shadow-2xl gap-6">
        <div className="flex w-full justify-between items-center gap-6">
          <h1 className="text-4xl font-bold mb-12">Feedbacks Page</h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col gap-6 justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">No feedbacks to show</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewFeedbacksPage;
