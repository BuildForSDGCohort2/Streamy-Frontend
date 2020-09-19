import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const [status, setStatus] = useState("error");
  return (
    <AuthContext.Provider value={[status, setStatus]}>
      {props.children}
    </AuthContext.Provider>
  );
}
