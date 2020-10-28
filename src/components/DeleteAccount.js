import React, { useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";

import { gql, useApolloClient, useMutation } from "@apollo/client";
import { IS_AUTHENTICATED } from "..";

const DELETE_ACCOUNT = gql`
  mutation($currentPassword: String!) {
    deleteAccount(password: $currentPassword) {
      password
    }
  }
`;

export default function DeleteAccount() {
  const client = useApolloClient();

  const [
    deleteAccount,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_ACCOUNT);

  const [currentPassword, setCurrentPassword] = useState("");

  const handleDeleteAccount = async (event, deleteAccount) => {
    event.preventDefault();
    await deleteAccount({
      variables: {
        currentPassword,
      },
    });
    localStorage.removeItem("authToken");
    client.writeQuery({
      query: IS_AUTHENTICATED,
      data: { isAuthenticated: false },
    });
  };
  return (
    <>
      <Row style={{ marginTop: "50px" }}>
        <Col className="order-xl-1" xl="8">
          <Card className=" shadow">
            <Card.Header className=" border-0" style={{ paddingTop: "30px" }}>
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Delete Account</h3>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {deleteError && (
                <div className="text-danger mb-3">{deleteError.message}</div>
              )}

              <Form
                onSubmit={(event) => handleDeleteAccount(event, deleteAccount)}
              >
                <h6 className="heading-small mb-4 text-danger">
                  ENTER CURRENT PASSWORD TO CONFIRM DELETE
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col>
                      <Form.Group>
                        <label
                          className="form-control-label"
                          htmlFor="input-currentpassword"
                        >
                          Current Password
                        </label>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            id="current-password"
                            type="password"
                            placeholder="Current Password"
                            onChange={(event) =>
                              setCurrentPassword(event.target.value)
                            }
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="text-center">
                    <Button
                      className="my-4"
                      type="submit"
                      color="danger"
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? " Deleting..." : "Delete Account"}
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
