import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Separator from "./Separator";

export default function AuthHeader() {
  return (
    <div className="header">
      <div className="py-7 py-lg-8">
        <span className="mask" />
        <Container>
          <div className="text-center mb-7 mt-7">
            <Row className="justify-content-center">
              <Col lg="5" md="6">
                <h1 className="text-white">Welcome to Streamy!</h1>
                <p className="text-lead text-light">Use these form to {""}</p>
              </Col>
            </Row>
          </div>
        </Container>
        <Separator />
      </div>
    </div>
  );
}
