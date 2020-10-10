import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { PlayerContext } from "../context/PlayerContext";
import ReactPlayer from "react-player";
import Loader from "./Loader";
// import YouTube from "react-youtube";

export default function TrailerPlayer() {
  const { showTrailer, trailerUrl, setShowTrailer } = useContext(PlayerContext);

  const [showLoader, setShowLoader] = useState(true);

  // const url = "https://www.youtube.com/watch?v=oUFJJNQGwhk";
  // const trailerUrls =
  //   "https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4";

  return showTrailer
    ? ReactDOM.createPortal(
        <>
          {showLoader && <Loader />}
          <div
            className="trailer-overlay"
            onClick={() => setShowTrailer(false)}
          >
            <div className="inner">
              <div className="player-wrapper trailer-player">
                <ReactPlayer
                  className="player"
                  url={trailerUrl}
                  controls={true}
                  playing={true}
                  onReady={() => setShowLoader(false)}
                />
              </div>
              {/* <YouTube videoId="2g811Eo7K8U" className="player" /> */}
              {/* <video id="trailer-player" controls>
                <source src={trailerUrls} type="video/mp4" />
              </video> */}

              {/* <div
              className="trailer-close"
              onClick={() => setShowTrailer((showTrailer) => !showTrailer)}
            >
              <i className="fa fa-times-circle" />
            </div> */}
            </div>
          </div>
        </>,
        document.body
      )
    : null;
}
