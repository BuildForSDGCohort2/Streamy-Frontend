import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import TrailerPlayer from "./TrailerPlayer";
import MoviePlayer from "./MoviePlayer";

export default function Player() {
  const { showTrailer, showMovie } = useContext(PlayerContext);
  return showTrailer ? <TrailerPlayer /> : showMovie ? <MoviePlayer /> : null;
}
