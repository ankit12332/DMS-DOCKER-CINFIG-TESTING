import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { NavDropdown } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import PatientDocument from '../programsComponent/uploadPatientDocumentComponent/patientDocument';
import EmployeeComponent from '../programsComponent/createEmployeeComponent/employeeComponent';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [moduleItems, setModuleItems] = useState([]);
  const { username } = useParams();
  const [activeProgramId, setActiveProgramId] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${username}/programs`, {
          withCredentials: true,
        });
        setModuleItems(response.data.programs);
      } catch (error) {
        console.log('Error fetching program data:', error);
        navigate('/login');
      }
    };

    fetchPrograms();
  }, [username, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/users/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  const handleClick = (id) => {
    setActiveProgramId(id);
  };
  

  return (
    <div className={`app ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div
        className=""
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '20px 20px',
          position: 'fixed',
          top: '0',
          backgroundColor: '#333',
          color: '#fff',
          zIndex: '2',
        }}
      >
        <p style={{ margin: '0' }}>Siksha O Anusandhan University <button
          className="sidebar-toggle"
          style={{
            marginRight: '30px',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
          onClick={toggleSidebar}
        >
          &#9776;
        </button></p>
       
        <NavDropdown
            id="nav-dropdown-dark-example"
            title={username.toUpperCase()}
            menuVariant="dark"
            style={{ color: '#fff' }} // Add this line
            >
            <NavDropdown.Item href="#/action-1">Edit Profile</NavDropdown.Item>
                <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </div>

      <div
        className="sidebar"
        style={{
          height: '100%',
          width: '250px',
          backgroundColor: '#ddd',
          position: 'fixed',
          top: '70px',
          left: '0',
          zIndex: '1',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-250px)',
          transition: 'transform 0.3s ease-in-out',
          overflowY: 'auto',
        }}
      >
        {moduleItems.map(program => (
          <p
            key={program.id}
            className="btn1"
            style={{
              margin: '10px 10px 10px 10px',
              width: '91%',
              fontWeight: 'normal',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => handleClick(program.id)}
          >
            <i className="fas fa-circle" style={{ marginRight: '10px' }}></i>
            {program.name}
          </p>
        ))}
      </div>

      <div
        className="main-container"
        style={{
          marginLeft: sidebarOpen ? '250px' : '0',
          transition: 'margin 0.3s ease-in-out',
        }}
      >
        <div
          className="main"
          style={{
            padding: '20px',
            marginTop: '90px',
            marginLeft: '20px',
            marginRight: '20px',
            backgroundColor: '#f5f5f5',
            height: 'calc(100vh - 110px)'
          }}
        >
          {   activeProgramId === 1 ? (
            <EmployeeComponent program={moduleItems.find(item => item.id === 1)} />
          ) : activeProgramId === 2 ? (
            <PatientDocument program={moduleItems.find(item => item.id === 2)} />
          ) : (
            <h1 style={{textAlign:'center'}}>Main Page</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
