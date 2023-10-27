import { Box, Paper } from "@mui/material";
import { ButtonGroup, Col, Container, Image, Row } from "react-bootstrap";
import { useState } from "react";
import React, { Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";

const Taskmodal = () => {
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.string().required(),
    date: yup.date().required(),
    time: yup.string().required(),
    services: yup.array().min(1).required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [appointment, setAppointment] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    date: "",
    time: "",
    services: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    AppointmentService.createAppointment(appointment)
      .then((response) => {
        console.log(response);
        const message =
          response.data.message ||
          "Appointment created ....See you at the salon!";
        successToast(message);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        const message =
          err?.response?.data.message ||
          "Could not book appointment, please try again!";
        errorToast(message);
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      {/* Header */}
      <Header />

      {/* Unlock unbeatable deals with our exclusive offers! */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontSize: "30px",
              color: "orange",
              fontFamily: "Delicious Handrawn,cursive",
            }}
          >
            Schedule Your Appointment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="POST" onSubmit={onSubmit}>
            <Form.Group>
              <Form.Control
                style={{
                  border: "none",
                  backgroundColor: "#faf5ee",
                  fontSize: "16px",
                  marginBottom: 15,
                }}
                required
                size="lg"
                placeholder="First Name"
                type="text"
                {...register("firstName")}
                onChange={handleChange}
              />
              {errors.firstName && (
                <Form.Text className="text-danger">
                  {errors.firstName.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Control
                style={{
                  border: "none",
                  backgroundColor: "#faf5ee",
                  fontSize: "16px",
                  marginBottom: 15,
                }}
                required
                size="lg"
                placeholder="Last Name"
                type="text"
                {...register("lastName")}
                onChange={handleChange}
              />
              {errors.lastName && (
                <Form.Text className="text-danger">
                  {errors.lastName.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Control
                style={{
                  border: "none",
                  backgroundColor: "#faf5ee",
                  fontSize: "16px",
                  marginBottom: 15,
                }}
                required
                size="lg"
                type="tel"
                placeholder="Mobile"
                {...register("mobile")}
                onChange={handleChange}
              />
              {errors.phone && (
                <Form.Text className="text-danger">
                  {errors.phone.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Control
                style={{
                  border: "none",
                  backgroundColor: "#faf5ee",
                  fontSize: "16px",
                  marginBottom: 15,
                }}
                required
                size="lg"
                placeholder="Select Date"
                type="date"
                {...register("date")}
                onChange={handleChange}
              />
              {errors.date && (
                <Form.Text className="text-danger">
                  {errors.date.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Control
                style={{
                  border: "none",
                  backgroundColor: "#faf5ee",
                  fontSize: "16px",
                  marginBottom: 15,
                }}
                required
                size="lg"
                type="time"
                placeholder="Select Time"
                {...register("time")}
                onChange={handleChange}
              />
              {errors.time && (
                <Form.Text className="text-danger">
                  {errors.time.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Services</Form.Label>
              <Form.Check
                type="checkbox"
                label="Haircut"
                {...register("services")}
                onChange={handleChange}
                value="haircut"
                multiple="multiple"
              />
              <Form.Check
                type="checkbox"
                label="Coloring"
                {...register("services")}
                onChange={handleChange}
                value="coloring"
                multiple="multiple"
              />
              <Form.Check
                type="checkbox"
                label="Manicure"
                {...register("services")}
                onChange={handleChange}
                value="manicure"
                multiple="multiple"
              />
              {errors.services && (
                <Form.Text className="text-danger">
                  {errors.services.message}
                </Form.Text>
              )}
            </Form.Group>
            <Modal.Footer>
              <Button
                onMouseOver={changeView}
                onMouseLeave={revertChange}
                onChange={handleChange}
                type="submit"
                style={{
                  marginTop: 5,
                  color: "white",
                  backgroundColor: "black",
                  border: "1px solid gold",
                  padding: 5,
                }}
              >
                Book Appointment
              </Button>
              <Button
                onClick={handleClose}
                onMouseOver={changeView}
                onMouseLeave={revertChange}
                style={{
                  marginTop: 5,
                  color: "white",
                  backgroundColor: "black",
                  border: "1px solid gold",
                  padding: 5,
                  marginLeft: 5,
                }}
                variant="secondary"
              >
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Footer />
    </Fragment>
  );
};

export default Taskmodal;
