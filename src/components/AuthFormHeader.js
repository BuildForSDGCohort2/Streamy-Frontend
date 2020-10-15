import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function AuthFormHeader() {
    return (
        <>
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
        </>
    )
}
