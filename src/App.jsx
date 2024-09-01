import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/authentication/LoginForm'
import RegisterForm from './pages/authentication/RegisterForm'


function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  </Router>
  )
}

export default App
