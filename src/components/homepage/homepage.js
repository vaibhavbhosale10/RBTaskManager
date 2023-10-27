import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Paper from "@mui/material/Paper";
import "./home.css";
import Button from "react-bootstrap/Button";
import { Link, Navigate } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ReactTask</Navbar.Brand>
          <Nav className="ms-auto me-3 my-2 my-lg-0">
            <Link className="navbarlink">Home</Link>
            <Link className="navbarlink">Features</Link>
            <Link className="navbarlink" to="/Login">
              Login
            </Link>
            <Link className="navbarlink" to="/Signup">
              Signup
            </Link>
            <Link className="navbarlink" to="/admin">
              Admin Login
            </Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col>
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="animate-charcter"> Manage your tasks.</h1>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              simplify your work by organizing and tracking tasks, enhancing
              productivity.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <button className="learn-more">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Learn More</span>
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Homepage;
