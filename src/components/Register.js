import React, { useState, useContext } from "react";
import { Button, Card, Form, InputGroup, Row, Col } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../context/AuthContext";

const REGISTER_USER = gql`
  mutation(
    $firstname: String!
    $lastname: String!
    $email: String!
    $username: String!
    $password: String!
    $password2: String!
  ) {
    register(
      firstName: $firstname
      lastName: $lastname
      email: $email
      username: $username
      password: $password
      password2: $password2
    ) {
      user {
        id
        username
      }
    }
  }
`;

export default function Register() {
  const [
    register,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(REGISTER_USER);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // change login state - defaults to "error"
  const { setStatus } = useContext(AuthContext);

  const handleSubmit = async (event, register) => {
    event.preventDefault();
    await register({
      variables: {
        firstname,
        lastname,
        email,
        username,
        password,
        password2,
      },
    });

    setStatus("success");
    window.location.href = "/login";
  };

  return (
    <>
      <Col lg="8" md="12">
        <Card className="border-0">
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
                    alt="Facebook icon"
                    src={require("../assets/img/icons/facebook.svg")}
                  />
                </span>
                <span className="btn-inner--text">Facebook</span>
              </Button>

              <Button
                className="btn-neutral btn-icon"
                color="neutral"
                href="#streamy"
              >
                <span className="btn-inner--icon">
                  <img
                    alt="google icon"
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
            <Form onSubmit={(event) => handleSubmit(event, register)}>
              <Row>
                <Col xs="6">
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="ni ni-circle-08" />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        id="firstname"
                        type="text"
                        placeholder="Firstname"
                        onChange={(event) => setFirstname(event.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="ni ni-circle-08" />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        id="lastname"
                        type="text"
                        placeholder="Lastname"
                        onChange={(event) => setLastname(event.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs="6">
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="ni ni-single-02" />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        id="username"
                        type="text"
                        placeholder="Username"
                        onChange={(event) => setUsername(event.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group className="mb-3">
                    <InputGroup>
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
                </Col>
              </Row>

              <Row>
                <Col xs="6">
                  <Form.Group>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        id="password"
                        type="password"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        id="password2"
                        type="password"
                        placeholder="Retype password"
                        onChange={(event) => setPassword2(event.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <div className="custom-control custom-control-alternative custom-checkbox">
                <input className="custom-control-input" type="checkbox" />
                <label className="custom-control-label">
                  <p
                    style={{
                      position: "relative",
                      top: "1px",
                      fontSize: "0.875rem",
                    }}
                  >
                    I agree with the <a href="#streamy">Privacy Policy</a>
                  </p>
                </label>
              </div>

              <div className="text-center">
                <Button
                  className="my-4"
                  type="submit"
                  color="primary"
                  disabled={
                    mutationLoading ||
                    !firstname.trim() ||
                    !lastname.trim() ||
                    !username.trim() ||
                    !email.trim() ||
                    !password.trim() ||
                    !password2.trim()
                  }
                >
                  {mutationLoading ? " Registering..." : "Create account"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        <Row className="mt-3">
          <Col xs="6">
            <small>
              Already a user?
              <a className="text-light" href="/login">
                <span mr="3"> Login</span>
              </a>
            </small>
          </Col>
        </Row>
      </Col>
    </>
  );
}
