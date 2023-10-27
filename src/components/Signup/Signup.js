import { Paper, useRadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import UserService from "../services/user-services";
import Swal from "sweetalert2";

const SignUp = () => {
  const [color, setColor] = useState("");
  const changeView = (e) => {
    setColor((e.target.style.color = "black"));
    setColor((e.target.style.backgroundColor = "white"));
    setColor((e.target.style.borderColor = "black"));
  };

  const revertChange = (e) => {
    setColor((e.target.style.color = "white"));
    setColor((e.target.style.backgroundColor = "black"));
    setColor((e.target.style.borderColor = "gold"));
  };

  const UserSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required!").min(3).max(25),
    lastName: yup.string().required("Last Name is required!").min(3).max(25),
    email: yup.string().required("Email is required!"),
    password: yup
      .string()
      .required("Password is mandatory")
      .min(3, "Password must be at 3 character long!"),
    confirmPassword: yup
      .string()
      .required("Password is mandatory")
      .oneOf([yup.ref("password")], "Passwords does not match"),
  });

  const {
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchema),
  });

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    role: "user",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    //create user
    UserService.createUser(user)
      .then((response) => {
        console.log(response);
        Swal.fire(
          "user created!",
          "Your account has been successfully created.",
          "success"
        );
        const message = response.data.message || "user registered";
        navigate("/login");
        console.log(message);
      })
      .catch((err) => {
        console.log(err);
        const message =
          err?.response?.data.message ||
          "Could not create an user, please try again!";
        console.log(message);
      });
  };

  return (
    <Fragment>
      <Container>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Col xs={11} sm={10} md={10} lg={6}>
            <Paper elevation={6}>
              <Row>
                <Col>
                  <a href="/home" style={{ textDecoration: "none" }}>
                    <h1
                      style={{
                        color: "orange",
                        fontSize: "3rem",
                        fontFamily: "Delicious Handrawn,cursive",
                      }}
                    >
                      Task Manager
                    </h1>
                  </a>
                  <h5 style={{ fontWeight: "bold" }}>Crate a new account</h5>

                  <p style={{ color: "gray" }}>it's quick and easy</p>
                </Col>
              </Row>

              <Row style={{ padding: "20px" }}>
                <Form onSubmit={handleSubmit}>
                  {/* First Name, Last Name */}
                  <Row>
                    {/* First Name */}
                    <Col
                      xs={12}
                      sm={12}
                      md={6}
                      style={{ marginBottom: "15px" }}
                    >
                      <Form.Group>
                        <Form.Control
                          style={{
                            border: "none",
                            backgroundColor: "#faf5ee",
                            fontSize: "16px",
                          }}
                          autoFocus
                          required
                          size="lg"
                          placeholder="First Name"
                          id="firstName"
                          name="firstName"
                          label="First Name"
                          type="text"
                          margin="dense"
                          onChange={handleChange}
                        />
                        {errors.firstName && (
                          <Form.Text className="text-danger">
                            {errors.firstName.message}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>

                    {/* Last Name */}
                    <Col
                      xs={12}
                      sm={12}
                      md={6}
                      style={{ marginBottom: "15px" }}
                    >
                      <Form.Group>
                        <Form.Control
                          style={{
                            border: "none",
                            backgroundColor: "#faf5ee",
                            fontSize: "16px",
                          }}
                          required
                          size="lg"
                          placeholder="Last Name"
                          id="lastName"
                          name="lastName"
                          label="Last Name"
                          type="text"
                          margin="dense"
                          onChange={handleChange}
                        />
                        {errors.lastName && (
                          <Form.Text className="text-danger">
                            {errors.lastName.message}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Email Address */}
                  <Col style={{ marginBottom: "15px" }}>
                    <Form.Group>
                      <Form.Control
                        style={{
                          border: "none",
                          backgroundColor: "#faf5ee",
                          fontSize: "16px",
                        }}
                        required
                        size="lg"
                        placeholder="Email Address"
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        margin="dense"
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <Form.Text className="text-danger">
                          {errors.email.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col style={{ marginBottom: "15px" }}>
                    <Form.Group>
                      <Form.Control
                        style={{
                          border: "none",
                          backgroundColor: "#faf5ee",
                          fontSize: "16px",
                        }}
                        required
                        size="lg"
                        placeholder="mobile"
                        id="mobile"
                        name="mobile"
                        label="mobile"
                        type="mobile"
                        margin="dense"
                        onChange={handleChange}
                      />
                      {errors.mobile && (
                        <Form.Text className="text-danger">
                          {errors.mobile.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>

                  {/* Password */}
                  <Col style={{ marginBottom: "15px" }}>
                    <Form.Group>
                      <Form.Control
                        style={{
                          border: "none",
                          backgroundColor: "#faf5ee",
                          fontSize: "16px",
                        }}
                        required
                        autoComplete="on"
                        size="lg"
                        placeholder="Password"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        margin="dense"
                        onChange={handleChange}
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                      />
                    </Form.Group>
                  </Col>

                  {/* Confirm Password */}
                  {/* <Col style={{ marginBottom: "15px" }}>
                    <Form.Group>
                      <Form.Control
                        style={{
                          border: "none",
                          backgroundColor: "#faf5ee",
                          fontSize: "16px",
                        }}
                        required
                        autoComplete="on"
                        size="lg"
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        margin="dense"
                        onChange={handleChange}
                        className={`form-control ${
                          errors.confirmPassword ? "is-invalid" : ""
                        }`}
                      />
                    </Form.Group>
                  </Col> */}

                  <Col>
                    <p style={{ color: "gray", fontSize: "12px" }}>
                      By clicking Sign Up, you agree to our Terms, Privacy
                      Policy and Cookies Policy.
                    </p>
                  </Col>

                  <Col style={{ marginBottom: "15px" }}>
                    <Button
                      onMouseOver={changeView}
                      onMouseLeave={revertChange}
                      type="submit"
                      style={{
                        fontSize: "17px",
                        backgroundColor: "black",
                        borderColor: "gold",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                      }}
                    >
                      Sign Up
                    </Button>
                  </Col>

                  <Col style={{ marginBottom: "15px" }}>
                    <h6>
                      <a href="/login" style={{ textDecoration: "none" }}>
                        Already have an account?
                      </a>
                    </h6>
                  </Col>
                </Form>
              </Row>
            </Paper>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SignUp;
