import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function AuthFooter() {
  return (
    <footer className="py-5">
      <Container>
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2018{" "}
              <a
                className="font-weight-bold ml-1"
                href="#streamy"
                target="_blank"
              >
                Streamy
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
