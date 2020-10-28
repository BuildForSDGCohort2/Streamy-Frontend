import React, { useContext, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { ME, UserContext } from "../context/UserContext";
import UserInfo from "./UserInfo";
import { ProfileContext } from "../context/ProfileContext";

const UPDATE_ACCOUNT = gql`
  mutation($firstname: String, $lastname: String, $email: String) {
    updateAccount(firstName: $firstname, lastName: $lastname, email: $email) {
      user {
        id
        firstName
        lastName
        username
        email
      }
    }
  }
`;

export default function EditProfile({ editProfileRef }) {
  const { currentUser: user } = useContext(UserContext);
  const { setUpdateStatus } = useContext(ProfileContext);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [
    updateAccount,
    { loading: accountLoading, error: accountError },
  ] = useMutation(UPDATE_ACCOUNT);

  const handleAccountUpdate = async (event, updateAccount) => {
    event.preventDefault();
    await updateAccount({
      variables: {
        firstname,
        lastname,
        email,
      },
      update: (cache, { data: { updateAccount } }) => {
        // const userData = cache.readQuery({ query: ME });

        cache.writeQuery({ query: ME, me: updateAccount.user });
      },
    });

    setUpdateStatus("success");
  };

  return (
    <>
      <Row>
        <UserInfo />

        <Col className="order-xl-1" xl="8" ref={editProfileRef}>
          <Card className=" shadow">
            <Card.Header className=" border-0" style={{ paddingTop: "30px" }}>
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Edit Profile</h3>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {accountError && (
                <div className="text-danger mb-3">{accountError.message}</div>
              )}

              <Form
                onSubmit={(event) => handleAccountUpdate(event, updateAccount)}
              >
                <h6 className="heading-small text-muted mb-4">
                  USER INFORMATION
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col xs="6">
                      <Form.Group className="mb-3">
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Firstname
                        </label>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>
                              <i className="ni ni-circle-08" />
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            id="firstname"
                            type="text"
                            defaultValue={user?.firstName}
                            placeholder="Firstname"
                            onChange={(event) =>
                              setFirstname(event.target.value)
                            }
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col xs="6">
                      <Form.Group>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Lastname
                        </label>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>
                              <i className="ni ni-circle-08" />
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            id="lastname"
                            type="text"
                            defaultValue={user?.lastName}
                            placeholder="Lastname"
                            onChange={(event) =>
                              setLastname(event.target.value)
                            }
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Email
                        </label>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>
                              <i className="ni ni-email-83" />
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            id="email"
                            type="email"
                            defaultValue={user?.email}
                            placeholder="email"
                            onChange={(event) => setEmail(event.target.value)}
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="text-center">
                    <Button
                      className="my-4"
                      type="submit"
                      color="primary"
                      disabled={accountLoading}
                    >
                      {accountLoading ? " Updating..." : "Update"}
                    </Button>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
