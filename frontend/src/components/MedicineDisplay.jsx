import React, { useEffect, useState } from 'react';

const MedicalHistory = ({ studentId }) => {
  const [history, setHistory] = useState([
    {
      id: 1,
      dateOfAdmission: '2024-07-01',
      dateOfDischarge: '2024-07-05',
      reason: 'Fever and cold',
      treatment: 'Vaccination',
    },
    {
      id: 2,
      dateOfAdmission: '2024-06-15',
      dateOfDischarge: '2024-06-20',
      reason: 'Flu symptoms',
      treatment: 'Antibiotics',
    },
  ]);

  useEffect(() => {
    // fetch(`/api/history/${studentId}`)
    //   .then(response => response.json())
    //   .then(data => setHistory(data))
    //   .catch(error => console.error('Error fetching medical history:', error));
  }, [studentId]);

  return (
    <div className="px-4 sm:px-0">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Medical History</h2>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {history.map(record => (
            <div key={record.id} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Date of Admission</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{record.dateOfAdmission}</dd>
              <dt className="text-sm font-medium leading-6 text-gray-900">Date of Discharge</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{record.dateOfDischarge || 'N/A'}</dd>
              <dt className="text-sm font-medium leading-6 text-gray-900">Reason</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{record.reason}</dd>
              
              <dt className="text-sm font-medium leading-6 text-gray-900">Treatment</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{record.treatment}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default MedicalHistory;
