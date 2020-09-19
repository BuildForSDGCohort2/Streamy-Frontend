import React from "react";
import { gql, useQuery } from "@apollo/client";
import AppNavbar from "../components/AppNavbar";
import AppHeader from "../components/AppHeader";
import MovieRow from "../components/MovieRow";

// const GET_USERS = gql`
//   {
//     users {
//       id
//       firstName
//       username
//     }
//   }
// `;

export const ME = gql`
  {
    me {
      id
      firstName
      lastName
      username
      email
    }
  }
`;

function App() {
  // const { loading, error, data } = useQuery(ME);

  // if (loading) return <div>Loading</div>;
  // if (error) return <div>{error.message}</div>;
  // if (!data) return <div>Not Found</div>;

  return (
    <div className="main-content">
      <AppNavbar />
      <AppHeader />
      <MovieRow />
    </div>
  );
}

export default App;
