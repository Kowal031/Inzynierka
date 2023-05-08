import { Login } from "@mui/icons-material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../User/Register";

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AuthRoutes;
