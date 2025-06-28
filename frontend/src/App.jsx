import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DonorForm from './components/DonorForm';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import LoginForm from './components/LoginForm';
import Tasks from './components/Tasks'; 
import Dashboard from './components/Dashboard';


function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/donorform" element={<DonorForm />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
