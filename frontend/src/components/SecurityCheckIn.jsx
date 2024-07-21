import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getCurrentTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  return strTime;
};

const getCurrentDate = () => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
};

const initialData = [
  // Sample data
  {
    date: "22/07/2005",
    fullName: "Jash Rashne",
    timeEntered: getCurrentTime(),
    timeExited: 'Not Checked Out'
  },
  {
    date: "22/07/2006",
    fullName: "Nieander Periera",
    timeEntered: getCurrentTime(),
    timeExited: 'Not Checked Out'
  },
  {
    date: "22/07/2007",
    fullName: "Arpita Pati",
    timeEntered: getCurrentTime(),
    timeExited: 'Not Checked Out'
  },
  {
    date: "22/07/2008",
    fullName: "Winoliya Ponsingh",
    timeEntered: getCurrentTime(),
    timeExited: 'Not Checked Out'
  },


  // Add more entries if needed
];

const SecurityCheckIn = () => {
  const [checkInModal, setCheckInModal] = useState(false);
  const [checkOutModal, setCheckOutModal] = useState(false);
  const [data, setData] = useState(initialData);
  const [newCheckIn, setNewCheckIn] = useState({
    fullName: '',
    date: getCurrentDate(),
    timeEntered: getCurrentTime(),
  });
  const [checkOutName, setCheckOutName] = useState('');
  const [checkOutTime, setCheckOutTime] = useState(getCurrentTime());
  const [checkOutDate, setCheckOutDate] = useState(getCurrentDate());
  const [filterDate, setFilterDate] = useState('');

  const handleCancel = () => {
    setCheckInModal(false);
    setNewCheckIn({
      fullName: '',
      date: getCurrentDate(),
      timeEntered: getCurrentTime(),
    });
  };

  const handleCheckIn = () => {
    const isAlreadyCheckedIn = data.some(item => item.fullName === newCheckIn.fullName && item.timeExited === 'Not Checked Out');
    if (isAlreadyCheckedIn) {
      toast.error('Cannot check in. This person has not checked out yet.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setData([...data, { ...newCheckIn, timeExited: 'Not Checked Out' }]);
      setCheckInModal(false);
      setNewCheckIn({
        fullName: '',
        date: getCurrentDate(),
        timeEntered: getCurrentTime(),
      });
    }
  };

  const handleCheckOut = () => {
    const personIndex = data.findIndex(item => item.fullName === checkOutName && item.timeExited === 'Not Checked Out');
    if (personIndex === -1) {
      toast.error('Cannot check out. This person has not checked in.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      const updatedData = data.map((item, index) => {
        if (index === personIndex) {
          return { ...item, timeExited: checkOutTime };
        }
        return item;
      });
      setData(updatedData);
      setCheckOutModal(false);
      setCheckOutName('');
    }
  };

  // Function to handle date input change
  const handleDateChange = (e) => {
    const value = e.target.value;
    // Restrict input to numbers and '/'
    if (/^[\d/]*$/.test(value)) {
      setFilterDate(value);
    }
  };

  // Filter data based on the selected date
  const filteredData = filterDate
    ? data.filter(item => item.date === filterDate)
    : data;

  return (
    <div className='m-2 flex flex-col h-full w-full'>
      <div className='h-[10%] w-full flex'>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={() => setCheckInModal(true)}
        >
          CheckIn
        </button>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={() => {
            setCheckOutTime(getCurrentTime());
            setCheckOutDate(getCurrentDate());
            setCheckOutModal(true);
          }}
        >
          CheckOut
        </button>
        <div>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input
              type="text"
              value={filterDate}
              onChange={handleDateChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:focus:ring-blue-500"
              placeholder="Select date"
            />
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto rounded-md h-[90%] w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 h-[4rem]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                CheckIn
              </th>
              <th scope="col" className="px-6 py-3">
                CheckOut
              </th>
            </tr>
          </thead>
          <tbody>
            {[...filteredData].reverse().map((item, index) => (
              <tr key={index} className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.fullName}
                </th>
                <td className="px-6 py-4">
                  {item.date}
                </td>
                <td className="px-6 py-4">
                  {item.timeEntered}
                </td>
                <td className="px-6 py-4">
                  {item.timeExited}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {checkInModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-400 p-6 rounded-lg shadow-lg h-[60vh] w-[60vh] relative">
            <div className="flex flex-col">
              <label className="mb-2">Full Name</label>
              <input
                type="text"
                value={newCheckIn.fullName}
                onChange={(e) => setNewCheckIn({ ...newCheckIn, fullName: e.target.value })}
                className="mb-4 p-2 border rounded"
              />
              <label className="mb-2">Date</label>
              <input
                type="text"
                value={newCheckIn.date}
                readOnly
                className="mb-4 p-2 border rounded"
              />
              <label className="mb-2">CheckIn Time</label>
              <input
                type="text"
                value={newCheckIn.timeEntered}
                readOnly
                className="mb-4 p-2 border rounded"
              />
            </div>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 absolute bottom-4 right-4"
            >
              Cancel
            </button>
            <button
              onClick={handleCheckIn}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 absolute bottom-4 left-4"
            >
              CheckIn
            </button>
          </div>
        </div>
      )}
      {checkOutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-400 p-6 rounded-lg shadow-lg h-[60vh] w-[60vh] relative">
            <div className="flex flex-col">
              <label className="mb-2">Full Name</label>
              <input
                type="text"
                value={checkOutName}
                onChange={(e) => setCheckOutName(e.target.value)}
                className="mb-4 p-2 border rounded"
              />
              <label className="mb-2">Date</label>
              <input
                type="text"
                value={checkOutDate}
                readOnly
                className="mb-4 p-2 border rounded"
              />
              <label className="mb-2">CheckOut Time</label>
              <input
                type="text"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                className="mb-4 p-2 border rounded"
              />
            </div>
            <button
              onClick={() => setCheckOutModal(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 absolute bottom-4 right-4"
            >
              Cancel
            </button>
            <button
              onClick={handleCheckOut}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 absolute bottom-4 left-4"
            >
              CheckOut
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default SecurityCheckIn;
