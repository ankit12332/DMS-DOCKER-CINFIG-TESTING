import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import CreateEmployee from './createEmployee';
import EditEmployee from './editEmployee';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const EmployeeComponent = () => {
  const [rowData, setRowData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const gridRef = useRef(null);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/getAllUsers');
      setRowData(response.data);
    } catch (error) {
      console.error('Failed to fetch employee data:', error);
    }
  };

  const handleSearch = () => {
    gridRef.current.api.setQuickFilter(searchText);
  };

  const handleCreateDialogOpen = () => {
    setShowCreateDialog(true);
  };

  const handleCreateDialogClose = () => {
    setShowCreateDialog(false);
  };

  const handleCreateEmployeeSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3000/users/create-user', formData);
  
      if (response.status === 201) {
        // Handle success
        console.log('Employee created successfully');
        handleCreateDialogClose(); // Close the create employee dialog
  
        // Refetch employee data after a successful creation
        fetch("http://localhost:3000/users/getAllUsers")
          .then(response => response.json())
          .then(data => {
            setRowData(data);
          });
  
      } else {
        // Handle error
        console.error('Failed to create employee:', response);
      }
    } catch (error) {
      // Handle error
      console.error('Failed to create employee:', error);
    }
  };

  const handleEditEmployeeSubmit = async (formData) => {
    try {
      const response = await axios.patch(`http://localhost:3000/users/${selectedEmployee.id}`, formData);

      if (response.status === 200) {
        console.log('Employee updated successfully');
        handleEditDialogClose();
        fetchEmployeeData();
      } else {
        console.error('Failed to update employee:', response);
      }
    } catch (error) {
      console.error('Failed to update employee:', error);
    }
  };

  const handleEditDialogClose = () => {
    setSelectedEmployee(null);
  };

  const EditButtonRenderer = ({ data }) => {
    const handleEdit = () => {
      setSelectedEmployee(data);
    };

    return (
      <button className="btn btn-link" onClick={handleEdit}>
        <FontAwesomeIcon icon={faEdit} />
      </button>
    );
  };

  const columnDefs = [
    { headerName: 'First Name', field: 'firstName', sortable: true, filter: true },
    { headerName: 'Last Name', field: 'lastName', sortable: true, filter: true },
    { headerName: 'Employee Code', field: 'employeeCode', sortable: true, filter: true },
    { headerName: 'Gender', field: 'gender', sortable: true, filter: true },
    { headerName: 'Date of Birth', field: 'dateOfBirth', sortable: true, filter: true },
    { headerName: 'Designation', field: 'designation', sortable: true, filter: true },
    {
      headerName: 'Options',
      field: 'options',
      cellRenderer: 'editButtonRenderer',
      sortable: false,
      filter: false,
      width: 100,
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
  };

  return (
    <>
      <h2>Employees Data</h2>
      <p style={{color:'#333333', fontSize:'13px'}}>Manage Employee Account</p>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={handleSearch}>
              Search
            </Button>
          </InputGroup>
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12">
          <Button className="btn btn-info" onClick={handleCreateDialogOpen}>
            Create New Employee
          </Button>
        </div>
      </div>

      <div className="ag-theme-alpine" style={{ height: '519px', width: '100%', border: '1px solid #ccc' }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressAutoSize={true}
          suppressHorizontalScroll={true}
          pagination={true}
          paginationPageSize={10}
          frameworkComponents={{
            editButtonRenderer: EditButtonRenderer,
          }}
        />
      </div>

      <CreateEmployee
        show={showCreateDialog}
        onClose={handleCreateDialogClose}
        onSubmit={handleCreateEmployeeSubmit}
      />

      {selectedEmployee && (
        <EditEmployee
          show={true}
          employee={selectedEmployee}
          onClose={handleEditDialogClose}
          onSubmit={handleEditEmployeeSubmit}
        />
      )}
    </>
  );
};

export default EmployeeComponent;
