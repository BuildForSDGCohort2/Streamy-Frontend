import React from "react";
import { Container, Row } from "react-bootstrap";

export default function AuthFooter() {
  return (
    <footer className="footer py-5">
      <Container>
        <Row className="footer-row">
          {/* <Col xl="6"> */}
          <div className="copyright text-center text-xl-left text-muted">
            © 2020{" "}
            <a
              className="font-weight-bold ml-1"
              href="#streamy"
              target="_blank"
            >
              Streamy
            </a>
          </div>
          {/* </Col> */}
        </Row>
      </Container>
    </footer>
  );
}
