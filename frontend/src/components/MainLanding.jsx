import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import logo from "../assets/logo.png";
import StudentDashboard from "./StudentDashboard";
import WardenDashboard from "./WardenDashboard";
import SecurityDashboard from "./SecurityDashboard";

const MainLanding = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        formData
      );
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        setIsAuthenticated(true);
        console.log(response.data.user); // Log the response data for debugging
        console.log("AFTER REPLACE");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case "student":
        return <StudentDashboard />;
      case "warden":
        return <WardenDashboard />;
      case "security":
        return <SecurityDashboard />;
      // Add more cases as needed for other roles
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isAuthenticated && (
          <div className="relative font-poppins h-[100vh] bg-stone-100 overflow-auto scrollbar-hide">
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5, ease: easeInOut }}
              className="flex flex-col items-center h-screen"
            >
              <header className="w-full flex justify-start p-2 absolute">
                <img src={logo} alt="Logo" className="h-[6rem] my-0" />
              </header>
              <div className="flex w-full h-full">
                <div className="w-1/2 flex items-center pt-10 pl-10 justify-center">
                  <div>
                    <h1 className="text-8xl font-bold text-stone-700">
                      HEALTH.
                    </h1>
                    <h1 className="text-8xl font-bold text-[#A2C579]">
                      HOSTEL.
                    </h1>
                    <h1 className="text-8xl font-bold text-[#C95B7A]">
                      HAPPINESS.
                    </h1>
                  </div>
                </div>
                <div className="w-2/5 flex items-center justify-center pr-0 pl-20 pt-20 mr-0">
                  <div className="w-full">
                    <h2 className="text-4xl font-semibold mb-5 text-stone-950">
                      Sign In
                    </h2>
                    <form className="w-full" onSubmit={handleSubmit}>
                      <div className="mb-5 w-full">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-stone-950"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div className="mb-5 w-full">
                        <label
                          htmlFor="password"
                          className="block mb-2 text-stone-950"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div className="mb-5 w-full">
                        <label
                          htmlFor="role"
                          className="block mb-2 text-stone-950"
                        >
                          Role
                        </label>
                        <select
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        >
                          <option value="student" className="text-stone-950">
                            Student
                          </option>
                          <option value="warden" className="text-stone-950">
                            Warden
                          </option>
                          <option value="security" className="text-stone-950">
                            Security
                          </option>
                          <option value="teacher" className="text-stone-950">
                            Teacher
                          </option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-[#C95B7A]"
                      >
                        Sign In
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {isAuthenticated && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: easeInOut }}
          className="flex font-poppins flex-col items-center h-screen"
        >
          {renderDashboard()}
        </motion.div>
      )}
    </>
  );
};

export default MainLanding;
