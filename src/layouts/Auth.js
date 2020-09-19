import React from "react";
import { Container, Row } from "react-bootstrap";
import AuthFooter from "../components/AuthFooter";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import AuthHeader from "../components/AuthHeader";
import AuthNavbar from "../components/AuthNavbar";

export default function Auth() {
  return (
    <div className="main-content">
      <AuthNavbar />
      <AuthHeader />

      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Switch>
            <Route path="/:id" children={<AuthForm />} />
          </Switch>
        </Row>
      </Container>
      <AuthFooter />
    </div>
  );
}
