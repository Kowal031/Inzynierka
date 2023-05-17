import { Box } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthWrapper from "./components/common/AuthWrapper";
import LoginBlocker from "./components/common/LoginBlocker";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import TrainingContextProvider from "./context/training-context";
import Layout from "./layout/Layout";

import RouteItems from "./routes/RouteItems";

function App() {
  return (
    <Box>
      <TrainingContextProvider>
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
      </TrainingContextProvider>
    </Box>
  );
}

export default App;
