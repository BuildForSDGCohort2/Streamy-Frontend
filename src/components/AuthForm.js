import React from "react";
import { useParams } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import AuthProvider from "./AuthContext";

export default function AuthForm() {
  let { id } = useParams();

  return id === "login" ? (
    <AuthProvider>
      <Login />
    </AuthProvider>
  ) : id === "register" ? (
    <AuthProvider>
      <Register />
    </AuthProvider>
  ) : null;
}
