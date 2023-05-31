import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const PatientDetails = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/patient/details')
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setRowData(data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const columnDefs = [
    { field: 'uhidNo', headerName: 'UHID No', sortable: true, filter: true, resizable: true,flex: 1},
    { field: 'episodeNo', headerName: 'Episode No', sortable: true, filter: true, resizable: true ,flex: 1},
    { field: 'patientName', headerName: 'Patient Name', sortable: true, filter: true, resizable: true,flex: 1 },
    { field: 'phoneNo', headerName: 'Phone No', sortable: true, filter: true, resizable: true ,flex: 1},
    { field: 'dateOfBirth', headerName: 'Date of Birth', sortable: true, filter: true, resizable: true,flex: 1 },
    {
      field: 'gender.name',
      headerName: 'Gender',
      valueGetter: (params) => params.data.gender ? params.data.gender.name : '',
      sortable: true, filter: true,
      resizable: true,flex: 1
    },
    {
      field: 'department.name',
      headerName: 'Department',
      valueGetter: (params) => params.data.department ? params.data.department.name : '',
      sortable: true, filter: true,
      resizable: true,flex: 1
    },
    {
      field: 'maritalStatus.name',
      headerName: 'Marital Status',
      valueGetter: (params) => params.data.maritalStatus ? params.data.maritalStatus.name : '',
      sortable: true, filter: true,
      resizable: true,flex: 1
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: '519px', width: '100%', border: '1px solid #ccc' }}>
      <AgGridReact 
          rowData={rowData}
          columnDefs={columnDefs}
          suppressAutoSize={true}
          suppressHorizontalScroll={true}
          pagination={true}
          paginationPageSize={10} />
    </div>
  );
};

export default PatientDetails;
