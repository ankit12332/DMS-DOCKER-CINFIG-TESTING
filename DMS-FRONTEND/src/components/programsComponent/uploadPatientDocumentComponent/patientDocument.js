import React, { useState } from 'react';
import { Row, Tab, Tabs } from 'react-bootstrap';
import CreatePatientDocument from './createPatientDocument';
import PatientDetails from './showPatientDetails';

function PatientDocument() {
  const [key, setKey] = useState('create');

  return (
    <div>
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={setKey}>
        <Tab eventKey="create" title="Create Patient Document">
            <Row style={{ marginTop: '15px' }}>
              <CreatePatientDocument />
            </Row>
        </Tab>
        <Tab eventKey="see" title="See Patient Document">
          {/* Put your age grid component here... */}
          <div style={{ marginTop: '15px' }}>
          <PatientDetails />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default PatientDocument;