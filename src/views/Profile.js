import React, { useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import AppNavbar from "../components/AppNavbar";
import { Container } from "react-bootstrap";
import SnackBar from "../components/Snackbar";
import ProfileHeader from "../components/ProfileHeader";
import AuthFooter from "../components/AuthFooter";
import Loader from "../components/Loader";
import Error from "../components/Error";
import DeleteAccount from "../components/DeleteAccount";
import EditProfile from "../components/EditProfile";
import PasswordChange from "../components/PasswordChange";
import { ProfileContext } from "../context/ProfileContext";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

export default function Profile() {
  const { userLoading, userError } = useContext(UserContext);
  const { updateStatus } = useContext(ProfileContext);

  const editProfileRef = useRef(null);
  const executeScroll = () => scrollToRef(editProfileRef);

  return (
    <>
      <AppNavbar />
      <ProfileHeader executeScroll={executeScroll} />

      <Container className="mt--7 profile" fluid>
        {updateStatus === "success" ? (
          <SnackBar
            isOpen={true}
            variant="success"
            message="Profile update successful!"
          />
        ) : null}

        <EditProfile editProfileRef={editProfileRef} />

        <PasswordChange />
        <DeleteAccount />
      </Container>

      {userLoading && <Loader />}
      {userError && <Error message={userError.message} />}

      <AuthFooter />
    </>
  );
}
