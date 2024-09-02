import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/authentication/Login'
import Register from './pages/authentication/Register'
import Crud from './pages/home/Crud';
import Profile from './pages/home/Profile';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/crud" element={<Crud/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
