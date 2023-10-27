import Paper from "@mui/material/Paper";
import React, { Fragment, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AdminService from "../services/admin-services";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

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

  //
  const userSchema = yup.object({
    email: yup.string().required("Email is required!"),
    password: yup.string().required("Password is required!"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // generate request
    AdminService.adminLogin(admin)
      .then((response) => {
        console.log("Response: ", response);

        // store the token in sessionStorage
        sessionStorage.setItem(
          "accessToken",
          response.headers["x-accesstoken"]
        );

        sessionStorage.setItem(
          "refreshToken",
          response.headers["x-refreshtoken"]
        );

        navigate("/admintasks");
      })
      .catch((err) => {
        console.log(err);
        const message =
          err?.response?.data.message || "Could not log in as Admin";
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
          <Col xs={11} sm={10} md={10} lg={5}>
            <Paper elevation={6} style={{ backgroundColor: "white" }}>
              <Row>
                <Col style={{ paddingTop: "20px" }}>
                  <h4 style={{ fontWeight: "600" }}>Admin Log In </h4>
                  <a href="/home" style={{ textDecoration: "none" }}>
                    <h2
                      style={{
                        color: "orange",
                        fontFamily: "Delicious Handrawn,cursive",
                      }}
                    >
                      Task Manager Admin <br />
                    </h2>
                  </a>
                </Col>
              </Row>

              <Row style={{ padding: "20px" }}>
                <Form onSubmit={onSubmit}>
                  <Col style={{ marginBottom: "15px" }}>
                    <Form.Control
                      style={{
                        border: "none",
                        backgroundColor: "#faf5ee",
                        fontSize: "16px",
                      }}
                      autoFocus
                      required
                      size="lg"
                      placeholder="Email Address"
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      margin="dense"
                      {...register("email")}
                      onChange={handleChange}
                      error={errors.email ? 1 : 0}
                    />
                  </Col>

                  <Col style={{ marginBottom: "15px" }}>
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
                      {...register("password")}
                      onChange={handleChange}
                      error={errors.password ? 1 : 0}
                    />
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
                      Login
                    </Button>
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

export default AdminLogin;
