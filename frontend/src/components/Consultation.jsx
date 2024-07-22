import React, { useState } from 'react';
import Videocall from './Videocall';

const Consultation = () => {
  const [showVideocall, setShowVideocall] = useState(false);

  const handleResponse = (response) => {
    if (response === 'yes') {
      setShowVideocall(true);
    } else {
      // Handle 'No' response as needed
      console.log('User chose not to schedule a consultation.');
    }
  };

  if (showVideocall) {
    return <Videocall />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Consultation</h2>
      <p className="text-lg mb-6">Do you want to schedule a consultation with a counsellor?</p>
      <div className="flex space-x-4">
        <button
          onClick={() => handleResponse('yes')}
          className="w-1/2 py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Yes
        </button>
        <button
          onClick={() => handleResponse('no')}
          className="w-1/2 py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Consultation;
