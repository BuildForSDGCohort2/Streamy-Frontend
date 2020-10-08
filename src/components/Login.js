import React, { useState, useContext } from "react";
import { Button, Card, Form, InputGroup, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useMutation, gql } from "@apollo/client";
import SnackBar from "../components/Snackbar";
import { IS_AUTHENTICATED } from "..";

const LOGIN = gql`
  mutation($email: String, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`;

export default function Login() {
  const [
    tokenAuth,
    { loading: mutationLoading, error: mutationError, client },
  ] = useMutation(LOGIN);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { status } = useContext(AuthContext);

  const handleSubmit = async (event, tokenAuth, client) => {
    event.preventDefault();
    const res = await tokenAuth({
      variables: {
        email,
        password,
      },
    });
    localStorage.setItem("authToken", res.data.tokenAuth.token);
    client.writeQuery({
      query: IS_AUTHENTICATED,
      data: { isAuthenticated: true },
    });
  };

  return (
    <>
      <Col lg="5" md="7">
        {status === "success" ? (
          <SnackBar
            isOpen={true}
            variant="success"
            message="Registration successful! Please Login"
          />
        ) : null}

        <Card className="card">
          <Card.Header className="bg-transparent pb-5">
            <div className="text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon mr-3"
                color="neutral"
                href="#streamy"
              >
                <span className="btn-inner--icon">
                  <img
                    alt="github icon"
                    src={require("../assets/img/icons/github.svg")}
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>

              <Button
                className="btn-neutral btn-icon"
                color="neutral"
                href="#streamy"
              >
                <span className="btn-inner--icon">
                  <img
                    alt="gooele icon"
                    src={require("../assets/img/icons/google.svg")}
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="px-lg-5 py-lg-5">
            {mutationError && (
              <div className="text-danger mb-3">{mutationError.message}</div>
            )}
            <div className="text-center mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form onSubmit={(event) => handleSubmit(event, tokenAuth, client)}>
              <Form.Group className="mb-3">
                <InputGroup className="input-group">
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="ni ni-email-83" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    className="form-control"
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </InputGroup>
              </Form.Group>

              <div className="custom-control custom-checkbox">
                <input className="custom-control-input" type="checkbox" />
                <label className="custom-control-label">
                  <small
                    style={{
                      position: "relative",
                      top: "1px",
                      fontSize: "0.875rem",
                    }}
                  >
                    Remember me
                  </small>
                </label>
              </div>

              <div className="text-center">
                <Button
                  className="my-4"
                  type="submit"
                  color="primary"
                  disabled={
                    mutationLoading || !email.trim() || !password.trim()
                  }
                >
                  {mutationLoading ? " Logging in..." : "Sign in"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a className="text-light" href="#streamy">
              <small>Forgot password</small>
            </a>
          </Col>
          <Col xs="6" className="text-right">
            <a className="text-light" href="/register">
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
}
