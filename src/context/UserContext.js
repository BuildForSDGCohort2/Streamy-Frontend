import React, { createContext } from "react";
import { gql, useQuery } from "@apollo/client";
import Loader from "../components/Loader";
import Error from "../components/Error";

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
  const { loading: userLoading, error: userError, data } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });

  if (userLoading) return <Loader />;
  if (userError) return <Error message={userError.message} />;

  const currentUser = data?.me;

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
}
