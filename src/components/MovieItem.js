import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieInfo from "./MovieInfo";
export default function MovieItem({ item, poster, title, genre }) {
  const {
    movieItem,
    showMovieInfo,
    setShowMovieInfo,
    setMovieItem,
  } = useContext(MovieContext);
  return (
    <>
      <div
        className={`${showMovieInfo ? "item transform" : "item"}`}
        style={{
          background: `url(${poster})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        onClick={() => {
          setMovieItem(item);
          setShowMovieInfo(true);
        }}
      >
        <div className="overlay">
          <div className="details">
            <p className="title">{title}</p>
            <small className="genre">{genre}</small>
          </div>
        </div>
      </div>
      {item === movieItem && <MovieInfo />}
    </>
  );
}
