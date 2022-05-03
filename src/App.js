import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";

const Home = () => <h1>Home (Public)</h1>;
const Pricing = () => <h1>Pricing (Public)</h1>;

const Settings = () => <h1>Settings (Private)</h1>;

const getLoggedInUserId = () =>
  window.location.href.split("?")[1].split("=")[1];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { authenticate } = useAuth();
  const adfcTokenSubscribe = (loggedInUserId) => {
    if (
      loggedInUserId &&
      window.location &&
      window.location.href &&
      (window.location.href.includes("health") ||
        window.location.href.includes("cypress"))
    ) {
    }
  };

  useEffect(() => {
    const loggedInUserId = getLoggedInUserId();
    if (loggedInUserId) {
      adfcTokenSubscribe(loggedInUserId);
    }
  });

  useEffect(() => {
    setIsAuthenticated(authenticate());
    console.log("isAuthenticated", isAuthenticated);
  }, [authenticate, isAuthenticated]);

  return (
    <div>
      <Router>
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}
