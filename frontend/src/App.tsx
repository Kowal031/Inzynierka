import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteItems from "./routes/RouteItems";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {RouteItems.map(({ toPath, component }) => (
          <Route key={toPath} path={toPath}>
            <Route index={true} element={component} />
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
