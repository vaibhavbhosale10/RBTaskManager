import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import DataFetch from "./components/dataFetching/dataFetch";
import AdminLogin from "./components/adminLogin/AdminLogin";
import AdminTasks from "./components/admin-tasks/AdminTasks";
import AuthService from "./components/services/Auth-services";
import AdminService from "./components/services/admin-services";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  const ProtectedRoute = ({ children }) => {
    useEffect(() => {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        console.log("Access token not available. Redirecting to login.");
        navigate("/login");
      } else {
        AuthService.validateToken()
          .then((response) => {
            console.log("Token is valid");
          })
          .catch((err) => {
            console.log("Invalid Token");
            sessionStorage.clear();
            navigate("/login");
          });
      }
    }, [navigate]);

    return children;
  };

  const AdminRoute = ({ children }) => {
    useEffect(() => {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        console.log("Access token not available. Redirecting to login.");
        navigate("/login");
      } else {
        AdminService.validateToken()
          .then((response) => {
            console.log("Token is valid");
          })
          .catch((err) => {
            console.log("Invalid Token");
            sessionStorage.clear();
            navigate("/login");
          });
      }
    }, [navigate]);

    return children;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/data"
          element={
            <ProtectedRoute>
              <DataFetch />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admintasks"
          element={
            <AdminRoute>
              <AdminTasks />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
