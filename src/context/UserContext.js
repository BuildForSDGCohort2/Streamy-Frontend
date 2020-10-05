import React, { createContext } from "react";
import { gql, useQuery } from "@apollo/client";

export const ME = gql`
  {
    me {
      id
      firstName
      lastName
      username
      email
      likeSet {
        movie {
          id
        }
      }
    }
  }
`;

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const { loading, error, data } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });
  const currentUser = data?.me;

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
}
