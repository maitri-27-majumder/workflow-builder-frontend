import { Button } from "antd";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") navigate("/workflow");
  }, []);
  return (
    <div className="app">
      <Button
        onClick={() => {
          if (location.pathname === "/workflow") navigate("/upload");
          else navigate("/workflow");
        }}
      >
        {location.pathname === "/workflow"
          ? "GO TO WORKFLOW TESTING"
          : "GO TO WORKFLOW BUILDER"}
      </Button>
      <Outlet />
    </div>
  );
}

export default App;
