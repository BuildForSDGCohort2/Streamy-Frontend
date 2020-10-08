import React from "react";
import { Button } from "react-bootstrap";

export default function Home({ movie }) {
  return (
    <div
      // className="movie-row"
      style={{
        // position: "fixed",
        margin: "200px",
        // left: 0,
        // top: 0,
        // right: 0,
        // bottom: 0,
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <div className="wrap">
        <div
          className="single-movie-item"
          style={{
            // background: `url(${movie.poster})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>

        {/* back */}
        <div
          style={{
            display: "flex",
            float: "right",
            padding: "10px",
          }}
        >
          <i className="fa fa-times-circle" />
        </div>
        <div className="movie-info">
          <div className="details">
            <p className="title">A title</p>
            <div style={{ display: "flex" }}>
              <small className="year">2020</small>
              <div className="rating">
                {Array(4)
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
            <small className="description">description</small>
          </div>
          <hr />
          <div className="info-button">
            <div className="btn-trailer">
              <span className="trailer-icon">
                <i className="fa fa-film"></i>
              </span>
              <span className="trailer-text">Watch Trailer</span>
            </div>
            <Button className="btn-play" type="submit">
              <span className="btn-icon">
                <i className="fa fa-play" />
              </span>
              <span className="btn-text">Play</span>
            </Button>
          </div>
        </div>

        {/* background */}
        {/* <div className="item-info-background"> </div> */}
      </div>
      {/* 1282a2 - blue

FEFCFB - white */}
    </div>
  );
}
