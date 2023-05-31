import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

const EditEmployee = ({ show, employee, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: employee.firstName,
    lastName: employee.lastName,
    employeeCode: employee.employeeCode,
    gender: employee.gender,
    dateOfBirth: employee.dateOfBirth,
    designation: employee.designation,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
      <Modal.Body>
          <Row>
            <Col>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </Form.Group>

              <Form.Group controlId="employeeCode">
                <Form.Label>Employee Code</Form.Label>
                <Form.Control
                  type="text"
                  name="employeeCode"
                  value={formData.employeeCode}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </Form.Group>

              <Form.Group controlId="designation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </Form.Group>
            </Col>
          </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" className="btn btn-primary">
              Update
            </Button>
          </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditEmployee;
