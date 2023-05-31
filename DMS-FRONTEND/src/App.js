import './App.css';
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Login from './components/loginComponent/login';
import Dashboard from './components/dashboardComponent/dashboard';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/:username/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
  );
}

export default App;
