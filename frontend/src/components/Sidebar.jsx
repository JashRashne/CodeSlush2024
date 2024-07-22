import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
const Sidebar = () => {
  const sideLinks = [
    {
      id: 1,
      label: "Home",
      link: "#",
    },
    {
      id: 2,
      label: "Sick Shield",
      link: "#",
    },
    {
      id: 3,
      label: "Leave Lever",
      link: "#",
    },
    {
      id: 4,
      label: "Room Radar",
      link: "#",
    },
    {
      id: 5,
      label: "Stress SOS",
      link: "#",
    },
  ];
  const SideLink = ({ name, to, icon }) => {
    return (
      <NavLink className="h-[6rem] flex items-center justify-center" to={to}>
        <div className="h-full w-[30%] flex items-center justify-center">
          <i class={`${icon} text-xl`}></i>
        </div>
        <div className="h-full w-[70%] flex items-center justify-center">
          {name}
        </div>
      </NavLink>
    );
  };

  return (
    <div className="flex flex-col h-[100%] items-center">
      <div className="logo h-[11.66%] flex items-center justify-center">
        <img src={logo} alt="logo" className="h-[4rem]" />
      </div>
      <div className="flex flex-col gap-[1rem] h-auto">
        {sideLinks.map((sideLink) => (
          <SideLink name={sideLink.label} to={sideLink.linl} icon={"ri-link"} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
