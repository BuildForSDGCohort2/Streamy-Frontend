import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function AuthNavbar() {
  const [blackNavbar, setBlackNavbar] = useState(false);

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

  return (
    <>
      <Navbar
        expand="md"
        fixed="top"
        className={`app-navbar ${blackNavbar ? "navbar-black" : ""}`}
      >
        <Container>
          <Navbar.Brand href="/">
            {/* <img
              alt="The app logo"
              src={require("../assets/img/brand/transparent_weblogo.png")}
              style={{ width: "8em" }}
            /> */}
            <span
              style={{ fontSize: "28px", color: "white", fontWeight: "700" }}
            >
              Streamy
            </span>
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link
              href="/login"
              style={{
                color: "#fff",
                paddingTop: "5px",
                borderRadius: "5px",
                background: "#5e72e4",
              }}
            >
              <i className="ni ni-single-02 mr-2" />
              <span>Sign in</span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
