import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Form, Modal, Button } from "react-bootstrap";
import taskServices from "../services/task-services";
import axios from "axios";

const UpdateProduct = () => {
  const emailId = sessionStorage.getItem("email");
  const apiUrl = `http://localhost:8080/api/task?email=${emailId}`;

  const [data, setData] = useState([]);
  const [taskdata, setTaskData] = useState([]);
  const [updatedata, setUpdatedData] = useState([]);
  const [task, setTask] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    taskName: "",
    taskDescription: "",
    email: "",
    Status: "",
    Priority: "",
    DueDate: "",
  });

  const fetchTaskforuser = async () => {
    try {
      const response = await axios.get(apiUrl);
      if (typeof response.data === "object") {
        setTaskData(response.data.data);
      } else {
        console.error("API response data is not an object:", response.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleUpdate = () => {
    // Assuming you have an API endpoint for updating products on the server
    taskServices
      .updateTask(selectedTask._id, updatedTask)
      .then((response) => {
        setData(response.data);
        setSelectedTask(null);
        setUpdatedTask({
          taskName: "",
          taskDescription: "",
          email: "",
          Status: "",
          Priority: "",
          DueDate: "",
        });
        fetchTaskforuser(); // Fetch the updated products after successful update
        handleClose(); // Close the modal after successful update
        Swal.fire("Updated!", "The task has been updated.", "success");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        Swal.fire("Error", "Failed to update the product.", "error");
      });
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setUpdatedTask({
      taskName: task.taskName,
      taskDescription: task.taskDescription,
      email: task.email,
      Status: task.Status,
      Priority: task.Priority,
      DueDate: task.DueDate,
    });
    handleShow();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="POST" onSubmit={handleUpdate}>
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
                placeholder="Product Name"
                type="text"
                name="taskName"
                value={updatedTask.taskName}
                onChange={(e) =>
                  setUpdatedTask({
                    ...updatedTask,
                    taskName: e.target.value,
                  })
                }
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
                placeholder="Product img url"
                type="text"
                name="taskDescription"
                value={updatedTask.taskDescription}
                onChange={(e) =>
                  setUpdatedTask({
                    ...updatedTask,
                    taskDescription: e.target.value,
                  })
                }
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
                name="email"
                value={updatedTask.email}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, price: e.target.value })
                }
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
                placeholder="Status"
                type="text"
                name="Status"
                value={updatedTask.Status}
                onChange={(e) =>
                  setUpdatedTask({
                    ...updatedTask,
                    description: e.target.value,
                  })
                }
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
                name="Priority"
                value={updatedTask.Priority}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, processor: e.target.value })
                }
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
                name="DueDate"
                value={updatedTask.DueDate}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedTask,
                    DueDate: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Modal.Footer>
              <Button
                type="submit"
                onClick={() => handleEditTask(task)}
                style={{
                  marginTop: 5,
                  color: "white",
                  backgroundColor: "black",
                  border: "1px solid gold",
                  padding: 5,
                }}
              >
                Update Task
              </Button>
              <Button
                onClick={handleClose}
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
};

export default UpdateProduct;
