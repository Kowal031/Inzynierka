import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/Token";

interface LoginBlockerProps {
  children: any;
}

const LoginBlocker: FC<LoginBlockerProps> = ({ children }) => {
  const token = getToken();

  if (!token) return<>{children}</>;
  return <></>;
};

export default LoginBlocker;
