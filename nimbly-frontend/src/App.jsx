import { useState } from 'react'
import './index.css'
import './app.css'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import DashBoard from './pages/Dashboard';
import Login from './pages/Login'

function App() {


  return (
    <>
    {/* Going to need a login page
    And To do page with pagination
    For persistence the api doesn't seem to keep track of token expiry so just
    need to delete it from localStorage when user logs out
    Unit testing will be done last */}
    <Router>
      <Routes>
          {/* a token will be sent back from the backend api*/}
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
