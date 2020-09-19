import React, { useState } from "react";

export default function MovieRow() {
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
    // let listW = items.results.length * 150;
    // if (window.innerWidth - listW > x) {
    //   x = (window.innerWidth - listW) - 60;
    // }
    setScrollX(x);
  };

  return (
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
            // width:items.results.length * 150
          }}
        >
          <div
            className="item"
            style={{
              background: `url(${require("../assets/img/movies/book-thief.jpeg")})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            {/* <img
              src={require("../assets/img/movies/book-thief.jpeg")}
              alt="movie"
            /> */}
            <div className="overlay">
              <div className="details">
                <p className="title">The Book Thief</p>
                <small className="genre">Adventure, Drama</small>
              </div>
            </div>
          </div>

          <div
            className="item"
            style={{
              background: `url(${require("../assets/img/movies/adaline.jpeg")})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="overlay">
              <div className="details">
                <p className="title">The Age of Adaline</p>
                <small className="genre">Adventure, Drama</small>
              </div>
            </div>
          </div>
          <div
            className="item"
            style={{
              background: `url(${require("../assets/img/movies/passengers.jpeg")})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="overlay">
              <div className="details">
                <p className="title">Passengers</p>
                <small className="genre">Adventure, Drama</small>
              </div>
            </div>
          </div>
          <div
            className="item"
            style={{
              background: `url(${require("../assets/img/movies/white-house-down.jpeg")})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="overlay">
              <div className="details">
                <p className="title">White House Down</p>
                <small className="genre">Adventure, Drama</small>
              </div>
            </div>
          </div>
          <div
            className="item"
            style={{
              background: `url(${require("../assets/img/movies/interstellar.jpeg")})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="overlay">
              <div className="details">
                <p className="title">Interstellar</p>
                <small className="genre">Adventure, Drama</small>
              </div>
            </div>
          </div>
          <div
            className="item"
            style={{
              background: `url(${require("../assets/img/movies/know-it.jpeg")})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="overlay">
              <div className="details">
                <p className="title">Know it</p>
                <small className="genre">Adventure, Drama</small>
              </div>
            </div>
          </div>
          <div
            className="item"
            style={{
              background: `url(${require("../assets/img/movies/passengers.jpeg")})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="overlay">
              <div className="details">
                <p className="title">Passengers</p>
                <small className="genre">Adventure, Drama</small>
              </div>
            </div>
          </div>
          <div
            className="item"
            style={{
              background: `url(${require("../assets/img/movies/white-house-down.jpeg")})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="overlay">
              <div className="details">
                <p className="title">White House Down</p>
                <small className="genre">Adventure, Drama</small>
              </div>
            </div>
          </div>
          <div
            className="item"
            style={{
              background: `url(${require("../assets/img/movies/interstellar.jpeg")})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="overlay">
              <div className="details">
                <p className="title">Interstellar</p>
                <small className="genre">Adventure, Drama</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
