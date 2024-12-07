import React from "react";
import Navbar from "../Common/Navbar";

export const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="children-container">{children}</div>
    </div>
  );
};
