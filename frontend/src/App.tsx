import { Box } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthWrapper from "./components/common/AuthWrapper";
import LoginBlocker from "./components/common/LoginBlocker";
import NotAcces from "./components/common/NotAcces";
import NotFound from "./components/common/NotFound";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Layout from "./layout/Layout";

import RouteItems from "./routes/RouteItems";

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Layout>
          <LoginBlocker>
            <Routes>
              <Route key="login" path="/" element={<Login />} />
              <Route key="login" path="/register" element={<Register />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </LoginBlocker>
          <AuthWrapper>
            <Routes>
              {RouteItems.map(({ toPath, component }) => (
                <Route key={toPath} path={toPath}>
                  <Route index={true} element={component} />
                </Route>
              ))}
            </Routes>
          </AuthWrapper>
        </Layout>
      </BrowserRouter>
    </Box>
  );
}

export default App;
