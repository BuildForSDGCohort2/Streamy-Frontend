import React, { useContext, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { gql, useMutation } from "@apollo/client";
import { ProfileContext } from '../context/ProfileContext';

const PASSWORD_CHANGE = gql`
  mutation(
    $oldPassword: String!
    $newPassword: String!
    $cfrmPassword: String!
  ) {
    passwordChange(
      oldPassword: $oldPassword
      newPassword: $newPassword
      cfrmPassword: $cfrmPassword
    ) {
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

export default function PasswordChange() {
  const {setUpdateStatus} = useContext(ProfileContext)

    const [
        passwordChange,
        { loading: passwordLoading, error: passwordError },
      ] = useMutation(PASSWORD_CHANGE);

      const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cfrmPassword, setCfrmPassword] = useState("");

  const handlePasswordChange = async (event, passwordChange) => {
    event.preventDefault();
    await passwordChange({
      variables: {
        oldPassword,
        newPassword,
        cfrmPassword,
      },
    });
    setUpdateStatus("success");
  };
    return (
        <>
            <Row style={{ marginTop: "50px" }}>
          <Col className="order-xl-1" xl="8">
            <Card className=" shadow">
              <Card.Header className=" border-0" style={{ paddingTop: "30px" }}>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Account</h3>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                {passwordError && (
                  <div className="text-danger mb-3">
                    {passwordError.message}
                  </div>
                )}

                <Form
                  onSubmit={(event) =>
                    handlePasswordChange(event, passwordChange)
                  }
                >
                  <h6 className="heading-small text-muted mb-4">
                    PASSWORD INFORMATION
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col>
                        <Form.Group>
                          <label
                            className="form-control-label"
                            htmlFor="input-oldpassword"
                          >
                            Old Password
                          </label>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              id="old-password"
                              type="password"
                              placeholder="Old Password"
                              onChange={(event) =>
                                setOldPassword(event.target.value)
                              }
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs="6">
                        <Form.Group className="mb-3">
                          <label
                            className="form-control-label"
                            htmlFor="input-newPassword"
                          >
                            New Password
                          </label>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              id="new-password"
                              type="password"
                              placeholder="New Password"
                              onChange={(event) =>
                                setNewPassword(event.target.value)
                              }
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>
                      <Col xs="6">
                        <Form.Group>
                          <label
                            className="form-control-label"
                            htmlFor="input-cfrmNewPassword"
                          >
                            Confirm Password
                          </label>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              id="cfrm-password"
                              type="password"
                              placeholder="Confirm Password"
                              onChange={(event) =>
                                setCfrmPassword(event.target.value)
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
                        color="primary"
                        disabled={passwordLoading}
                      >
                        {passwordLoading ? " Updating..." : "Update"}
                      </Button>
                    </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        </>
    )
}
