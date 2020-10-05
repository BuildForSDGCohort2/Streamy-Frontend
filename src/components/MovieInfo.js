import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { Button } from "react-bootstrap";
import LikeMovie from "./LikeMovie";
import { PlayerContext } from "../context/PlayerContext";

const movieTrailer = require("movie-trailer");

export default function MovieInfo() {
  const { showMovieInfo, movieItem, setShowMovieInfo } = useContext(
    MovieContext
  );

  const {
    setShowTrailer,
    trailerUrl,
    setTrailerUrl,
    setShowMovie,
  } = useContext(PlayerContext);

  const handleTrailer = (title) => {
    movieTrailer(title || "", { multi: true })
      .then((url) => {
        setTrailerUrl(url);
        setShowTrailer(trailerUrl ? true : false);
      })
      .catch((error) => console.log(error));
  };

  return showMovieInfo ? (
    <>
      <div className="wrap">
        {/* <div
          className="single-movie-item"
          style={{
            background: `url(${movieItem.poster})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div> */}

        {/* back */}
        <div
          className="info-close"
          onClick={() => {
            setShowMovieInfo(false);
          }}
        >
          <i className="fa fa-times-circle" />
        </div>

        {/* {trailerUrl1 && <Player trailerUrl={trailerUrl1} />} */}
        {/* <Player trailerUrl={trailerUrl} /> */}

        <div className="movie-info">
          <div className="details">
            <p className="title">{movieItem.title}</p>
            <div style={{ display: "flex" }}>
              <small className="year">{movieItem.year}</small>
              <div className="rating">
                {Array(movieItem.rating)
                  .fill()
                  .map((_, i) => (
                    <p key={i}>
                      <span role="img" aria-label="star">
                        ⭐
                      </span>
                    </p>
                  ))}
              </div>
            </div>
            <small className="description">{movieItem.description}</small>
          </div>
          <hr />
          <div className="info-button">
            <div
              className="btn-trailer"
              onClick={() => {
                handleTrailer(movieItem.title);
              }}
            >
              <span className="trailer-icon">
                <i className="fa fa-film"></i>
              </span>
              <span className="trailer-text">Watch Trailer</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <LikeMovie
                movieId={movieItem.id}
                likeCount={movieItem.likes.length}
              />
              <Button className="btn-play" type="submit">
                <span className="btn-icon">
                  <i className="fa fa-play" />
                </span>
                <span className="btn-text">Play</span>
              </Button>
            </div>
          </div>
        </div>

        {/* background */}
        {/* <div className="item-info-background"> </div> */}
      </div>
      {/* 1282a2 - blue

FEFCFB - white */}
    </>
  ) : null;
}
