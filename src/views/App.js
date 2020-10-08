import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import AppNavbar from "../components/AppNavbar";
import AppHeader from "../components/AppHeader";
import MovieRow from "../components/MovieRow";
import AuthFooter from "../components/AuthFooter";
import Loader from "../components/Loader";
import Error from "../components/Error";
import MovieProvider from "../context/MovieContext";
import PlayerProvider from "../context/PlayerContext";

export const GET_MOVIES = gql`
  {
    movies {
      id
      title
      year
      url
      rating
      description
      poster
      cover
      genre
      likes {
        id
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_MOVIES);

  let random = Math.floor(Math.random() * (data?.movies.length - 1));
  let chosen = data?.movies[random];

  const [searchResults, setSearchResults] = useState([]);

  const movies = searchResults.length > 0 ? searchResults : data?.movies;

  if (loading) return <Loader />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="main-content">
      <AppNavbar setSearchResults={setSearchResults} />
      {data?.movies.length > 0 && (
        <PlayerProvider>
          <AppHeader
            title={chosen?.title}
            description={chosen?.description}
            year={chosen?.year}
            rating={chosen?.rating}
            cover={chosen?.cover}
          />
          <MovieProvider>
            <MovieRow movies={movies} />
          </MovieProvider>
          <AuthFooter />{" "}
        </PlayerProvider>
      )}
    </div>
  );
}

export default App;
