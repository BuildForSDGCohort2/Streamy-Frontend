import React, { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import ReactPlayer from "react-player";
import Loader from "./Loader";

export default function TrailerPlayer() {
  const { showTrailer, trailerUrl, setShowTrailer } = useContext(PlayerContext);

  const [showLoader, setShowLoader] = useState(true);

  return showTrailer ? (
    <>
      <div className="trailer-overlay" onClick={() => setShowTrailer(false)}>
        <div className="inner">
          <div className="trailer-wrapper trailer-player">
            <ReactPlayer
              className="player"
              url={trailerUrl}
              controls={true}
              playing={true}
              onReady={() => setShowLoader(false)}
            />
          </div>

          <div className="close-player" onClick={() => setShowTrailer(false)}>
            <i className="fa fa-times" />
          </div>
        </div>
      </div>
      {showLoader && <Loader />}
    </>
  ) : null;
}
