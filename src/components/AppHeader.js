import React, { useContext } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { PlayerContext } from "../context/PlayerContext";
import Player from "./Player";

const movieTrailer = require("movie-trailer");

export default function AppHeader({ title, description, year, rating, cover }) {
  let movieDescription = description;
  if (movieDescription?.length > 400) {
    movieDescription = movieDescription.substring(0, 400) + "...";
  }

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
      .catch(() => {});
    // .catch((error) => console.log(error));
  };

  return (
    <>
      <div
        className="featured"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${cover})`,
        }}
      >
        <div className="gradient-vertical ">
          <div className="gradient-horizontal pt-5 pt-lg-8 d-flex align-items-center">
            <Container className="details d-flex align-items-center" fluid>
              <Row>
                <Col lg="7" md="10">
                  <div style={{ display: "flex" }}>
                    <div className="title">{title}</div>

                    <div className="rating">
                      {Array(rating)
                        .fill()
                        .map((_, i) => (
                          <p key={i}>
                            {/* <span role="img" aria-label="star">
                              ⭐
                            </span> */}
                            <i
                              className="fa fa-star"
                              style={{ color: "#FFA500", fontSize: "14px" }}
                            />
                          </p>
                        ))}
                      {Array(5 - rating)
                        .fill()
                        .map((_, i) => (
                          <p key={i}>
                            <i
                              className="fa fa-star"
                              style={{ color: "#B0B0B0", fontSize: "14px" }}
                            />
                          </p>
                        ))}
                    </div>
                  </div>
                  <small className="year">{year}</small>
                  <div className="description">
                    <p className="">{movieDescription}</p>
                  </div>

                  <div className="buttonRow">
                    <Button
                      className="btn-play"
                      type="submit"
                      onClick={() => {
                        setShowMovie(true);
                      }}
                    >
                      <span className="btn-icon">
                        <i className="fa fa-play" />
                      </span>
                      <span className="btn-text">Play</span>
                    </Button>
                    <button className="btn-more" type="submit">
                      <span className="btn-icon">
                        <i className="fa fa-plus" />
                      </span>
                      <span className="btn-text">More</span>
                    </button>
                  </div>
                  <div
                    className="btn-trailer"
                    onClick={() => handleTrailer(title)}
                  >
                    <span className="trailer-icon">
                      <i className="fa fa-film"></i>
                    </span>
                    <span className="trailer-text">Watch Trailer</span>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <Player />
    </>
  );
}
