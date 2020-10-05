import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import AppNavbar from "../components/AppNavbar";

export default function Profile() {
  const user = useContext(UserContext);
  return (
    <>
      <AppNavbar />
      <div>
        <h3>
          {user?.firstName} {user?.lastName}
        </h3>
        <p>{user?.username}</p>
        <p>{user?.email}</p>
      </div>
    </>
  );
}
