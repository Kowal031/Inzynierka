import { FC } from "react";
import { getToken } from "../../utils/Token";

interface LoginBlockerProps {
  children: any;
}

const LoginBlocker: FC<LoginBlockerProps> = ({ children }) => {
  const token = getToken();

  if (!token) return <>{children}</>;
  return <></>;
};

export default LoginBlocker;
