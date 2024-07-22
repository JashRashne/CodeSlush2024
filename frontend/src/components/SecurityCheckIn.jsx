import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import close from "../assets/close.png";
import "react-toastify/dist/ReactToastify.css";

const getCurrentTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;
  return strTime;
};

const getCurrentDate = () => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
};

const initialData = [
  // Sample data
  {
    date: "22/07/2005",
    fullName: "Jash Rashne",
    email: "jash@example.com",
    timeEntered: getCurrentTime(),
  },
  {
    date: "22/07/2006",
    fullName: "Nieander Periera",
    email: "nieander@example.com",
    timeEntered: getCurrentTime(),
  },
  {
    date: "22/07/2007",
    fullName: "Arpita Pati",
    email: "arpita@example.com",
    timeEntered: getCurrentTime(),
  },
  {
    date: "22/07/2008",
    fullName: "Winoliya Ponsingh",
    email: "winoliya@example.com",
    timeEntered: getCurrentTime(),
  },
  // Add more entries if needed
];

const SecurityCheckIn = ({ setCheckInPage }) => {
  const [checkInModal, setCheckInModal] = useState(false);
  const [data, setData] = useState(initialData);
  const [newCheckIn, setNewCheckIn] = useState({
    email: "",
    fullName: "",
    date: getCurrentDate(),
    timeEntered: getCurrentTime(),
  });
  const [filterDate, setFilterDate] = useState("");
  const [studentEmails, setStudentEmails] = useState([]);

  useEffect(() => {
    // Fetch student emails from the server for autocomplete
    const fetchEmails = async () => {
      axios
        .get("http://localhost:8000/student-emails")
        .then((response) => {
          setStudentEmails(response.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the student emails!",
            error
          );
        });
    };
    // Fetch initial check-in data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/get-entries");
        setData(response.data);
      } catch (error) {
        console.error("There was an error fetching the check-in data!", error);
      }
    };

    fetchEmails();
    fetchData();
  }, []);
  const handleCancel = () => {
    setCheckInModal(false);
    setNewCheckIn({
      email: "",
      fullName: "",
      date: getCurrentDate(),
      timeEntered: getCurrentTime(),
    });
  };

  const handleCheckIn = async () => {
    try {
      console.log(newCheckIn);
      // Make an API call to save the new check-in entry to the database
      const response = await axios.post(
        "http://localhost:8000/hostel-entry",
        newCheckIn
      );

      if (response.status === 201) {
        // Update the local state only if the API call was successful
        setData([...data, newCheckIn]);
        setCheckInModal(false);
        setNewCheckIn({
          email: "",
          fullName: "",
          date: getCurrentDate(),
          timeEntered: getCurrentTime(),
        });
        toast.success("Check-in successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        throw new Error("Failed to check in.");
      }
    } catch (error) {
      console.error("Error during check-in", error);
      toast.error("Check-in failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Handle autocomplete selection
  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setNewCheckIn((prevState) => ({ ...prevState, email }));

    // Fetch the student's name based on email
    try {
      const response = await axios.get(`http://localhost:8000/?email=${email}`);
      if (response.data) {
        setNewCheckIn((prevState) => ({
          ...prevState,
          fullName: response.data.fullName,
          date: getCurrentDate(),
          timeEntered: getCurrentTime(),
        }));
      }
    } catch (error) {
      console.error("Error fetching student data", error);
    }
  };

  // Handle date input change
  const handleDateChange = (e) => {
    const value = e.target.value;
    // Restrict input to numbers and '/'
    if (/^[\d/]*$/.test(value)) {
      setFilterDate(value);
    }
  };

  // Filter data based on the selected date
  const filteredData = filterDate
    ? data.filter((item) => item.date === filterDate)
    : data;

  // Handle download button click
  const download = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/download-entries",
        {
          responseType: "blob", // This is important for file downloads
        }
      );
      const formattedDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
      const fileName = `Entry_${formattedDate}`;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.xlsx`; // Name the file to be downloaded
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up the URL object
      window.URL.revokeObjectURL(url);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-[100%] overflow-hidden w-full">
      <div className="h-[15%] w-[100%] rounded-t-[1.8rem]  flex items-center bg-[#E0FEF8] justify-center">
        {" "}
        <div
          onClick={() => {
            setCheckInPage(false);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl w-7 h-7 cursor-pointer flex items-center justify-center"
        >
          <img src={close} alt="close" />
        </div>
        <div className="font-bold text-[3.7rem] text-[#164346] ">
          Security Check-In
        </div>
      </div>
      <div className="h-[85%] flex flex-col">
        <div className="h-[20%] w-full flex items-center  gap-[1rem]">
          <button
            type="button"
            className="bg-[#ddeeeb] hover:bg-[#bee2dd] w-[10%] h-[40%] font-medium rounded-lg text-sm "
            onClick={() => setCheckInModal(true)}
          >
            CheckIn
          </button>
          <button
            type="button"
            className="bg-[#ddeeeb] hover:bg-[#bee2dd] w-[10%] h-[40%] font-medium rounded-lg text-sm "
            onClick={download}
          >
            Download
          </button>
          <div></div>
        </div>

        <div className="relative overflow-auto scrollbar-hide sm:rounded-lg h-[100%] w-full">
          <table className="w-full text-sm text-start text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 w-[100%]">
              <tr className="bg-white border-b flex justify-center w-full ">
                {" "}
                <th scope="col" className="px-6 py-3 w-[20%]">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3 w-[50%]">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 w-[30%]">
                  Time Entered
                </th>
              </tr>
            </thead>
            <tbody className="w-[100%] flex flex-col justify-center">
              {filteredData.map((entry, index) => (
                <tr
                  key={index}
                  className="bg-white border-b  flex justify-center w-[100%] "
                >
                  {console.log(entry)}
                  <td className="px-6 py-4 w-[20%] flex justify-center">
                    {entry.student?.fullName}
                  </td>
                  <td className="px-6 py-4 w-[60%] flex justify-center ">
                    {entry.student?.email}
                  </td>
                  <td className="px-6 py-4 w-[30%] flex justify-center">
                    {new Date().toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {checkInModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">CheckIn Form</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={newCheckIn.email}
                  onChange={handleEmailChange}
                  list="email-options"
                />
                <datalist id="email-options">
                  {studentEmails.map((email) => (
                    <option key={email} value={email} />
                  ))}
                </datalist>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={newCheckIn.fullName}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="text"
                  id="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={newCheckIn.date}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="timeEntered"
                  className="block text-sm font-medium text-gray-700"
                >
                  Time Entered
                </label>
                <input
                  type="text"
                  id="timeEntered"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={newCheckIn.timeEntered}
                  readOnly
                />
              </div>
            </form>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-600 text-white font-medium px-4 py-2 rounded-lg mr-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-[#a3ddd4] font-medium px-4 py-2 rounded-lg"
                onClick={handleCheckIn}
              >
                CheckIn
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default SecurityCheckIn;
