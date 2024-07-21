import "./Todo.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthProvider from "./security/AuthContext";
import ListTodosComp from "./ListTodosComp";
import TodoComp from "./TodoComp";
import HeaderComp from "./HeaderComp";
import FooterComp from "./FooterComp";
import LoginComp from "./LoginComp";
import LogoutComp from "./LogoutComp";
import WelcomComp from "./WelcomeComp";
import ErrorComp from "./ErrorComp";
import { useAuth } from "./security/AuthContext";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) return children;

  return <Navigate to={"/"} />;
}

export default function TodoApp() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComp />
          <Routes>
            <Route path="/" element={<LoginComp />} />
            <Route path="/login" element={<LoginComp />} />
            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <WelcomComp />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodosComp />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <LogoutComp />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todo/:id"
              element={
                <AuthenticatedRoute>
                  <TodoComp />
                </AuthenticatedRoute>
              }
            />

            <Route path="*" element={<ErrorComp />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
