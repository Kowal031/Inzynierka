import { Box } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";

import RouteItems from "./routes/RouteItems";

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Layout>
          <Routes>
            {RouteItems.map(({ toPath, component }) => (
              <Route key={toPath} path={toPath}>
                <Route index={true} element={component} />
              </Route>
            ))}
          </Routes>
        </Layout>
      </BrowserRouter>
    </Box>
  );
}

export default App;
