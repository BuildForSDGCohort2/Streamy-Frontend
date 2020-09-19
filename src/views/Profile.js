import React from "react";

export default function Profile({ user }) {
  return (
    <>
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
