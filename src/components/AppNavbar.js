import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container, Media, Dropdown } from "react-bootstrap";
import { useApolloClient } from "@apollo/client";
import { IS_AUTHENTICATED } from "..";
import { UserContext } from "../context/UserContext";
import Search from "./Search";
// import { Input } from "@material-ui/core";

export default function AppNavbar({ setSearchResults }) {
  const [blackNavbar, setBlackNavbar] = useState(false);
  const client = useApolloClient();

  const user = useContext(UserContext);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackNavbar(true);
      } else {
        setBlackNavbar(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  const handleSignout = () => {
    localStorage.removeItem("authToken");
    client.writeQuery({
      query: IS_AUTHENTICATED,
      data: { isAuthenticated: false },
    });
  };

  return (
    <>
      <Navbar
        className={`app-navbar ${blackNavbar ? "navbar-black" : ""}`}
        variant="dark"
        expand="md"
        id="navbar-main"
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            {/* <img
              alt="The app logo"
              src={require("../assets/img/brand/transparent_weblogo.png")}
              style={{ width: "8em", marginLeft: "10px" }}
            /> */}
            <span
              style={{ fontSize: "28px", color: "white", fontWeight: "700" }}
            >
              Streamy
            </span>
          </Navbar.Brand>

          <Nav className="align-items-center d-sm-flex d-md-flex" navbar>
            <Search setSearchResults={setSearchResults} />

            <Dropdown alignRight>
              <span>
                <Dropdown.Toggle className="p-0 nav-toggle">
                  <Media className="align-items-center">
                    <img
                      width={48}
                      height={48}
                      className="rounded-circle user-avatar"
                      alt="..."
                      src={require("../assets/img/theme/team-4-800x800.jpg")}
                    />
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {user?.firstName} {user?.lastName}
                      </span>
                    </Media>
                  </Media>
                </Dropdown.Toggle>
              </span>

              <Dropdown.Menu style={{ position: "absolute" }}>
                <Dropdown.Header>Welcome!</Dropdown.Header>
                <Dropdown.Item href={`/profile/${user?.username}`}>
                  <i className="ni ni-single-02" />
                  <span style={{ marginLeft: "10px", color: "#212529" }}>
                    My profile
                  </span>
                </Dropdown.Item>
                <Dropdown.Item href={`/profile/${user?.username}`}>
                  <i className="ni ni-settings-gear-65" />
                  <span style={{ marginLeft: "10px", color: "#212529" }}>
                    Settings
                  </span>
                </Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleSignout(client)}
                  >
                    Logout
                  </span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
