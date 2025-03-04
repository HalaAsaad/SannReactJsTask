import "./App.css";
import React, { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBarComp from "./Components/AppBarComp";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Login from "./Pages/Auth/Login";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import Signup from "./Pages/Auth/Signup";
import VerfiyEmail from "./Pages/Auth/VerfiyEmail";
import ResendVerificationEmail from "./Pages/Auth/ResendVerificationEmail";

const theme = {
  palette: {
    mode: "light",
    primary: { main: "rgb(78, 98, 177)" },
    secondary: { main: "rgb(187, 186, 66)" },
    error: { main: "#d6573c" },
    success: { main: "#43ce85" },
    warning: { main: "#43ce85" },
    font_gray: { main: "#7b8191" },
    bg_white: { main: "#f3f3f3" },
    menu_color: "rgba(255, 255, 255, 0.5)",
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
};

function App() {
  // const { Token } = useContext(AppContext);
  // console.log('Token ', Token);
  //$ git remote add origin https://github.com/HalaAsaad/SannReactJsTask.git
  const Token = localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={createTheme(theme)}>
          <CssBaseline enableColorScheme />
          {Token ? (
            <AppBarComp>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </AppBarComp>
          ) : (
            <Routes>
              <Route index element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verfiy-email/:token" element={<VerfiyEmail />} />
              <Route
                path="/resend-verification-email"
                element={<ResendVerificationEmail />}
              />
              <Route path="*" element={<Login />} />
            </Routes>
          )}
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
