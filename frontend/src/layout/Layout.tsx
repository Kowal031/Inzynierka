import { Box } from "@mui/material";
import React, { FC, ReactNode } from "react";
import Header from "../components/common/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
