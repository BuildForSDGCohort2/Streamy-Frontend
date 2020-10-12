import React, { useContext, useState } from "react";
import ReactPlayer from "react-player";
import { PlayerContext } from "../context/PlayerContext";
import Loader from "./Loader";

export default function MoviePlayer() {
  const { showMovie, setShowMovie } = useContext(PlayerContext);

  const [showLoader, setShowLoader] = useState(true);

  return showMovie ? (
    <>
      <div className="movie-overlay">
        <div className="movie-wrapper movie-player">
          <ReactPlayer
            className="player"
            url="https://www.youtube.com/watch?v=nskYB4TxlyE"
            controls={true}
            playing={true}
            onReady={() => setShowLoader(false)}
          />
          <div className="close-player" onClick={() => setShowMovie(false)}>
            <i className="fa fa-times" />
          </div>
        </div>
      </div>
      {showLoader && <Loader />}
    </>
  ) : null;
}
