import React, { useEffect, useState } from "react";
import taskServices from "../services/task-services";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import AdminTaskService from "../services/admin-task-services";

function AdminTasks() {
  const [color, setColor] = useState("");
  const Navigate = useNavigate();

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
    email: "",
    Duedate: "",
    Priority: "low",
    Status: "pending",
  });
  const [data, setData] = useState([]);
  const [taskdata, setTaskData] = useState([]);

  const fetchTaskforAdmin = async () => {
    try {
      const response = await AdminTaskService.fetchAllAdmintask();
      if (typeof response.data === "object") {
        setTaskData(response.data.data);
      } else {
        console.error("API response data is not an object:", response.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  useEffect(() => {
    fetchTaskforAdmin();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    reset();
    taskServices
      .createTask(task)
      .then((response) => {
        console.log(response);
        Swal.fire("Task Created!", "saved in database!", "success");
        fetchTaskforAdmin();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire(
          "Could not create task",
          "Check your internet connection",
          "error"
        );
      });
  };

  const deleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        AdminTaskService.deleteadminTask(id)
          .then((response) => {
            console.log("Response from task: ", response);
            Swal.fire("Deleted!", "The task has been deleted.", "success");
            fetchTaskforAdmin();
          })
          .catch((err) => {
            console.error(err);

            Swal.fire(
              "Not Deleted!",
              "The task has not been deleted.",
              "error"
            );
          });
      }
    });
  };
  const onLogout = () => {
    sessionStorage.clear();
    Navigate("/");
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div className="navbar">
        <div className="add-task-form">
          <input type="text" placeholder="Search tasks" />
          <Button onClick={handleShow}>Add task</Button>
          <Button onClick={onLogout}>Log Out</Button>
        </div>
      </div>
      <div className="task-list">
        {taskdata.map((task, index) => {
          return (
            <div className="task-list" key={index}>
              <div key={index} className="task-card">
                <h3>Task Created By : {task.email}</h3>
                <h3>{task.taskName}</h3>
                <p>{task.taskDescription}</p>
                <p>Priority: {task.Priority}</p>
                <p>Status: {task.Status}</p>
                <p>Due date:{new Date(task.Duedate).toLocaleString()}</p>
                <div className="button-container">
                  <button className="complete-button">Edit task</button>
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task?._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontSize: "30px",
              color: "orange",
              fontFamily: "Delicious Handrawn,cursive",
            }}
          >
            Create Your Task
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
                placeholder="Task Name"
                type="text"
                {...register("taskName")}
                onChange={handleChange}
              />
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
                placeholder="Task Description"
                type="text"
                {...register("taskDescription")}
                onChange={handleChange}
              />
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
                placeholder="email"
                type="text"
                {...register("email")}
                onChange={handleChange}
              />
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
                placeholder="Due Date"
                type="date"
                {...register("Duedate")}
                onChange={handleChange}
              />
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
                placeholder="Priority"
                type="text"
                {...register("Priority")}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="Status"
                {...register("Status")}
                onChange={handleChange}
              >
                <option value="pending">pending</option>
                <option value="inprogress">In progress</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>
            <Modal.Footer>
              <Button
                onClick={onSubmit}
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
                Create Task
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
    </div>
  );
}

export default AdminTasks;
