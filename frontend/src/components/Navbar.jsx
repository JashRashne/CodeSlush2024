import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import setting from "../assets/setting.png";
import logout from "../assets/logout.png";
import { motion } from "framer-motion";
import axios from "axios";

const Navbar = () => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  async function logoutUser() {
    try {
      const response = await axios.post(
        "http://localhost:8000/logout",
        {}, // Assuming no body is required
        { withCredentials: true }
      ); // Include credentials);

      console.log(response.data);
      localStorage.removeItem("user");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-full w-full flex items-center justify-between px-5">
      <div className=" h-full flex items-center justify-center">
        <img src={logo} alt="logo" width={70} />
      </div>
      <motion.div
        className="mr-7 flex items-center justify-center relative"
        onClick={() => setIsSettingOpen(!isSettingOpen)}
      >
        <img
          src={setting}
          alt="setting"
          className="w-[2.3rem] cursor-pointer"
        />

        {isSettingOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.6, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 40, x: -20 }}
              transition={{
                delay: 0.1,
                duration: 0.2,
                ease: "easeInOut",
              }}
              className="absolute top-0 right-0 bg-orange-300 w-[12rem] h-[5rem] rounded-[0.6rem] p-2 gap-2 flex items-center justify-center z-[120] font-medium"
            >
              <h1 className="text-2xl">Logout</h1>
              <img
                src={logout}
                alt="logout"
                className="w-[1.2rem] cursor-pointer"
                onClick={() => logoutUser()}
              />
            </motion.div>
          </>
        ) : (
          <></>
        )}
      </motion.div>
    </div>
  );
};

export default Navbar;
