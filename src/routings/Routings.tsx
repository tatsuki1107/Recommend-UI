import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./AuthService";
import LoggedInRoute from "./LoggedInRoute";
import Login from "../Login";

import App from "../App";


const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <LoggedInRoute>
                <App />
              </LoggedInRoute>
            } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routing;
