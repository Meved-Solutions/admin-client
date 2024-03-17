import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import Login from "./pages/Login";
import Profile from './pages/Profile';
import JobPostings from './pages/JobPostings';
import Organizations from './pages/Organizations';
import Register from './pages/Register';

const Navigate = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return(
    <div>
      {isAuthenticated &&
        <div className="flex flex-row py-2">
          <div>
            <Sidebar/>
          </div>
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/postings' element={<JobPostings/>}/>
          <Route path='/organizations' element={<Organizations/>}/>
        </Routes>
        </div>
      }
      {
        !isAuthenticated &&
            <Routes>
              <Route path="/auth" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
            </Routes>
      }
    </div>
  )
}

const App = () => {
  return(
    <Router>
      <Navigate/>
    </Router>
  );
}

export default App
