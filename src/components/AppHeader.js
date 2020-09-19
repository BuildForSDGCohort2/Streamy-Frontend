import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

export default function AppHeader() {
  return (
    <>
      <div
        className="featured"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(https://occ-0-299-300.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABXTEB_bMQOF6HvgQ4KwAShgsOwzR0aSWg8gRfRx4l9dKHLbspSRoK6n9bAC__2C7rcK4yTYVZiwxm-Vzy6vYnVdKJleg.jpg?r=b3b)`,
        }}
      >
        <div className="gradient-vertical ">
          <div className="gradient-horizontal pt-5 pt-lg-8 d-flex align-items-center">
            <Container className="details d-flex align-items-center" fluid>
              <Row>
                <Col lg="7" md="10">
                  <div style={{ display: "flex" }}>
                    <div className="title">Lucifer</div>

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
                  <small className="year">2020</small>
                  <div className="description">
                    <p className="">
                      27 years after the first meeting of the guys with the
                      demonic Pennywise. They have already grown, and each has
                      its own life. But suddenly their quiet existence is
                      disturbed by a strange phone call that forces them to come
                      together again. 27 years after the first meeting of the
                      guys with the demonic Pennywise. They have already grown,
                      and each has its own life. But suddenly their quiet
                      existence is disturbed by a strange phone call that forces
                      them to come together again.
                    </p>
                  </div>

                  <div className="buttonRow">
                    <Button className="btn-play" type="submit">
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
                  <div className="btn-trailer">
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
    </>
  );
}
