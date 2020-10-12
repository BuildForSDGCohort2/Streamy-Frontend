import React, { useState } from "react";
import MovieItem from "./MovieItem";

export default function MovieRow({ movies }) {
  const [scrollX, setScrollX] = useState(0);

  const handleLeftNav = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightNav = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);

    let listW = movies?.length * 1500;

    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };

  return (
    <>
      <div className="movie-row">
        <h2>Latest Movies</h2>
        <div className="nav-prev" onClick={handleLeftNav}>
          <i className="fa fa-chevron-left" />
        </div>
        <div className="nav-next" onClick={handleRightNav}>
          <i className="fa fa-chevron-right" />
        </div>

        <div className="list-area">
          <div
            className="list"
            style={{
              marginLeft: scrollX,
              // minWidth: movies?.length * (window.innerWidth / 1.5),
            }}
          >
            {movies?.length > 0 &&
              movies?.map((movie) => (
                <MovieItem
                  key={movie.id}
                  item={movie}
                  poster={movie.poster}
                  title={movie.title}
                  genre={movie.genre}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
