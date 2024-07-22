import React from "react";
const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-red-200 h-[100vh] w-[100%] relative">
        <div className="h-[10%] border-b-2">THIS IS NAVBAR</div>

        <div className="h-[90%] w-[100%]">{children}</div>
      </div>{" "}
    </>
  );
};

export default Layout;
