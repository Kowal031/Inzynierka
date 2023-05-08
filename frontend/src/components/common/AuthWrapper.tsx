import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/Token";
import Login from "../User/Login";

interface AuthWrapperProps {
  children: any;
}

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  const token = getToken();

  if (token) return <>{children}</>;

  if (!token) return <></>;

  return <>{children}</>;
};

export default AuthWrapper;
