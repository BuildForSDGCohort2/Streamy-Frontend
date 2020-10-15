import React, { useContext } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { UserContext } from '../context/UserContext';


export default function UserInfo() {
  const { currentUser: user } = useContext(UserContext);

    return (
        <>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a
                      href="#sreamy"
                      onClick={(event) => event.preventDefault()}
                    >
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <Card.Header className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  {/* <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button> */}
                </div>
              </Card.Header>
              <Card.Body className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">{user?.likeSet.length}</span>
                        <span className="description">
                          <i className="fa fa-heart" />
                          {user?.likeSet.length > 1 ? "Likes" : "Like"}
                        </span>
                      </div>
                      <div>
                        <span className="heading">4</span>
                        <span className="description">
                          <i className="fa fa-eye" />
                          Views
                        </span>
                      </div>
                      {/* <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div> */}
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {user?.firstName} {user?.lastName}
                    <span className="font-weight-light"></span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {user?.username}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {user?.email}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </>
    )
}
