import React, { useContext, useState } from "react";
import { ME, UserContext } from "../context/UserContext";
import AppNavbar from "../components/AppNavbar";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import SnackBar from "../components/Snackbar";
import ProfileHeader from "../components/ProfileHeader";
import AuthFooter from "../components/AuthFooter";
import { IS_AUTHENTICATED } from "..";
import Loader from "../components/Loader";
import Error from "../components/Error";

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

const DELETE_ACCOUNT = gql`
  mutation($currentPassword: String!) {
    deleteAccount(password: $currentPassword) {
      password
    }
  }
`;

export default function Profile() {
  const { userLoading, userError, currentUser: user } = useContext(UserContext);
  const client = useApolloClient();

  const [
    updateAccount,
    { loading: accountLoading, error: accountError },
  ] = useMutation(UPDATE_ACCOUNT);

  const [
    passwordChange,
    { loading: passwordLoading, error: passwordError },
  ] = useMutation(PASSWORD_CHANGE);

  const [
    deleteAccount,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_ACCOUNT);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cfrmPassword, setCfrmPassword] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");

  const [updateStatus, setUpdateStatus] = useState("");

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
      <AppNavbar />
      <ProfileHeader />

      <Container className="mt--7 profile" fluid>
        {updateStatus === "success" ? (
          <SnackBar
            isOpen={true}
            variant="success"
            message="Profile update successful!"
          />
        ) : null}

        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a
                      href="#sreamy"
                      onClick={(event) => event.preventDefault()}
                    >
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <Card.Header className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  {/* <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button> */}
                </div>
              </Card.Header>
              <Card.Body className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">{user?.likeSet.length}</span>
                        <span className="description">
                          <i className="fa fa-heart" />
                          {user?.likeSet.length > 1 ? "Likes" : "Like"}
                        </span>
                      </div>
                      <div>
                        <span className="heading">4</span>
                        <span className="description">
                          <i className="fa fa-eye" />
                          Views
                        </span>
                      </div>
                      {/* <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div> */}
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {user?.firstName} {user?.lastName}
                    <span className="font-weight-light"></span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {user?.username}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {user?.email}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col className="order-xl-1" xl="8">
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
                  onSubmit={(event) =>
                    handleAccountUpdate(event, updateAccount)
                  }
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
                  onSubmit={(event) =>
                    handleDeleteAccount(event, deleteAccount)
                  }
                >
                  <h6 className="heading-small text-muted mb-4">
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
      </Container>

      {userLoading && <Loader />}
      {userError && <Error message={userError.message} />}

      <AuthFooter />
    </>
  );
}
