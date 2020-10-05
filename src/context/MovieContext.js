import React, { createContext, useState } from "react";

export const MovieContext = createContext();

export default function MovieProvider({ children }) {
  const [showMovieInfo, setShowMovieInfo] = useState(false);
  const [movieItem, setMovieItem] = useState({});
  return (
    <MovieContext.Provider
      value={{ showMovieInfo, setShowMovieInfo, movieItem, setMovieItem }}
    >
      {children}
    </MovieContext.Provider>
  );
}
