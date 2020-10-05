import React, { createContext, useState } from "react";

export const PlayerContext = createContext();

export default function PlayerProvider({ children }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [showMovie, setShowMovie] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  return (
    <PlayerContext.Provider
      value={{
        showTrailer,
        setShowTrailer,
        trailerUrl,
        setTrailerUrl,
        showMovie,
        setShowMovie,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
