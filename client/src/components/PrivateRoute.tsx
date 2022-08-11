// @ts-nocheck

import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const jwt = JSON.parse(localStorage.getItem("jwtToken"));

  return jwt ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
