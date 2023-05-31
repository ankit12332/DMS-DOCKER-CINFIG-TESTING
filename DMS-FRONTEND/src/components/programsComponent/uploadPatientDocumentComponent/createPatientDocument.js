import React, { useState, useEffect  } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

function CreatePatientDocument() {
  const [formValues, setFormValues] = useState({
    hospitalId: '',
    uhidNo: '',
    episodeNo: '',
    redgDate: '',
    patientName: '',
    genderId: '',
    phoneNo: '',
    age: '',
    departmentId: '',
    bedId: '',
    dateOfBirth: '',
    preMature: '',
    maritalStatusId: '',
    documents: [],
  });

  const [validations, setValidations] = useState({
    hospitalId: true,
    uhidNo: true,
    episodeNo: true,
    patientName: true,
    genderId: true,
    phoneNo: true,
    age: true,
    departmentId: true,
    bedId: true,
    dateOfBirth: true,
    preMature: true,
    maritalStatusId: true,
    documents: true,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFileValid, setIsFileValid] = useState(false);
  const [genders, setGenders] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [maritalStatuses, setMaritalStatuses] = useState([]);


  useEffect(() => {
    // Fetch gender data
    axios.get('http://localhost:3000/patient/genders')
      .then(response => {
        setGenders(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    // Fetch department data
    axios.get('http://localhost:3000/patient/departments')
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    // Fetch marital status data
    axios.get('http://localhost:3000/patient/marital-statuses')
      .then(response => {
        setMaritalStatuses(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleInputChange = (field, value) => {
    setFormValues(prevValues => ({ ...prevValues, [field]: value }));

    setValidations(prevValidations => ({
      ...prevValidations,
      [field]: value !== '',
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

     // Set formSubmitted to true when the form is submitted
    setFormSubmitted(true);

    // Client-side validation
    let isValid = true;
    const newValidations = {};

    if (formValues.uhidNo === '') {
      newValidations.uhidNo = false;
      isValid = false;
    } else {
      newValidations.uhidNo = true;
    }

    if (formValues.episodeNo === '') {
      newValidations.episodeNo = false;
      isValid = false;
    } else {
      newValidations.episodeNo = true;
    }

    if (formValues.patientName === '') {
      newValidations.patientName = false;
      isValid = false;
    } else {
      newValidations.patientName = true;
    }

    if (formValues.phoneNo === '') {
      newValidations.phoneNo = false;
      isValid = false;
    } else {
      newValidations.phoneNo = true;
    }

    if (formValues.documents.length === 0) {
      newValidations.documents = false;
      isValid = false;
    } else {
      newValidations.documents = true;
    }

    setValidations(newValidations);

    if (!isValid) {
      // Display an error message or perform some other action
      console.log('Please fill in all required fields and select at least one document');
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (key === 'documents') {
          value.forEach((file) => {
            formData.append('documents', file);
          });
        } else {
          formData.append(key, value);
        }
      });

      await axios.post('http://localhost:3000/patient', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormValues({
        hospitalId: '',
        uhidNo: '',
        episodeNo: '',
        redgDate: '',
        patientName: '',
        genderId: '',
        phoneNo: '',
        age: '',
        departmentId: '',
        bedId: '',
        dateOfBirth: '',
        preMature: '',
        maritalStatusId: '',
        documents: [],
      });

      setFormSubmitted(false); // Reset formSubmitted state
      setIsFileValid(false); // Reset file validation state
      document.getElementById('documents').value = ''; // Reset file input value
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormValues((prevValues) => ({
      ...prevValues,
      documents: files,
    }));

    setIsFileValid(files.length > 0);
  };

  return (
    <Form onSubmit={handleFormSubmit} className="needs-validation" noValidate>
      <div>
        <Row>
          <Col md={4}>
              <Form.Group controlId="patientName">
                <Form.Label>Patient Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={formValues.patientName}
                  onChange={e => handleInputChange('patientName', e.target.value)}
                  required
                  className={formSubmitted ? (!validations.patientName ? 'is-invalid' : 'is-valid') : ''}
                />
                {!validations.patientName && <div className="invalid-feedback">Patient Name is required</div>}
              </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="uhidNo">
              <Form.Label>UHID No:</Form.Label>
              <Form.Control
                type="text"
                value={formValues.uhidNo}
                onChange={e => handleInputChange('uhidNo', e.target.value)}
                required
                className={formSubmitted ? (!validations.uhidNo ? 'is-invalid' : 'is-valid') : ''}
              />
              {/* Display error message */}
              {!validations.uhidNo && <div className="invalid-feedback">UHID No is required</div>}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="episodeNo">
              <Form.Label>Episode No:</Form.Label>
              <Form.Control
                type="text"
                value={formValues.episodeNo}
                onChange={e => handleInputChange('episodeNo', e.target.value)}
                required
                className={formSubmitted ? (!validations.episodeNo ? 'is-invalid' : 'is-valid') : ''}
              />
              {!validations.episodeNo && <div className="invalid-feedback">Episode No is required</div>}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group controlId="phoneNo">
              <Form.Label>Phone No:</Form.Label>
              <Form.Control
                type="text"
                value={formValues.phoneNo}
                onChange={e => handleInputChange('phoneNo', e.target.value)}
                required
                className={formSubmitted ? (!validations.phoneNo ? 'is-invalid' : 'is-valid') : ''}
              />
              {!validations.phoneNo && <div className="invalid-feedback">Patient Name is required</div>}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="redgDate">
              <Form.Label>Registration Date:</Form.Label>
              <Form.Control
                type="date"
                value={formValues.redgDate}
                onChange={e => handleInputChange('redgDate', e.target.value)}
                />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="hospitalId">
              <Form.Label>Hospital ID:</Form.Label>
              <Form.Control
                type="text"
                value={formValues.hospitalId}
                onChange={e => handleInputChange('hospitalId', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group controlId="genderId">
            <Form.Label>Gender:</Form.Label>
              <Form.Control
                as="select"
                value={formValues.genderId}
                onChange={e => handleInputChange('genderId', e.target.value)}
              >
                <option value="">Select Gender</option>
                {genders.map(gender => (
                  <option key={gender.id} value={gender.id}>
                    {`${gender.name}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="age">
              <Form.Label>Age:</Form.Label>
              <Form.Control
                type="text"
                value={formValues.age}
                onChange={e => handleInputChange('age', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="departmentId">
            <Form.Label>Department:</Form.Label>
              <Form.Control
                as="select"
                value={formValues.departmentId}
                onChange={e => handleInputChange('departmentId', e.target.value)}
              >
                <option value="">Select Department</option>
                {departments.map(department => (
                  <option key={department.id} value={department.id}>
                    {`${department.name}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group controlId="bedId">
              <Form.Label>Bed ID:</Form.Label>
              <Form.Control
                type="text"
                value={formValues.bedId}
                onChange={e => handleInputChange('bedId', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control
                type="date"
                value={formValues.dateOfBirth}
                onChange={e => handleInputChange('dateOfBirth', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="preMature">
              <Form.Label>Pre-Mature:</Form.Label>
              <Form.Control
                type="text"
                value={formValues.preMature}
                onChange={e => handleInputChange('preMature', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group controlId="maritalStatusId">
            <Form.Label>Marital Status:</Form.Label>
              <Form.Control
                as="select"
                value={formValues.maritalStatusId}
                onChange={e => handleInputChange('maritalStatusId', e.target.value)}
              >
                <option value="">Select Marital Status</option>
                {maritalStatuses.map(status => (
                  <option key={status.id} value={status.id}>
                    {`${status.name}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="documents">
              <Form.Label>Documents:</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleFileChange}
                required // Mark field as required
                className={formSubmitted ? (!isFileValid ? 'is-invalid' : 'is-valid') : ''}
          />
          {formSubmitted && !isFileValid && (
            <div className="invalid-feedback">Please select at least one document</div>
          )}
        </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
}

export default CreatePatientDocument;
