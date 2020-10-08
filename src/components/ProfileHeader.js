import React, { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

export default function ProfileHeader() {
  const user = useContext(UserContext);
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("../assets/img/theme/cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-default opacity-8" />
        <Container className="d-flex align-items-center profile-header" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello {user?.firstName}</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks
              </p>
              <Button color="info" href="#" onClick={(e) => e.preventDefault()}>
                Edit profile
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
