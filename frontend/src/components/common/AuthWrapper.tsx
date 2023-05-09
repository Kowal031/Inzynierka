import { FC } from "react";
import { getToken } from "../../utils/Token";

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
