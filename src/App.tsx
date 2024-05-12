import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import Login from "./pages/Login";
import Profile from './pages/Profile';
import JobPostings from './pages/JobPostings';
import Organizations from './pages/Organizations';
import Register from './pages/Register';
import JobPosting from './pages/JobPosting';
// import Employees from './pages/Employees';
import Applicants from './pages/Applicants';
// import Messages from './pages/Messages';
import Settings from './pages/Settings';
import { useRecoilValue } from 'recoil';
import { Authenticated } from './atom';
import Applicant from './pages/Applicant';
import Organization from './pages/Organization';

const Navigate = () => {

  const isAuthenticated = useRecoilValue(Authenticated);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      if (location.pathname === "/") {
        navigate('/auth');
      }
    } else {
      if (location.pathname === "/") {
        navigate('/postings');
      }
    }
  }, [navigate, location, isAuthenticated]);

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
          <Route path='/posting/:id' element={<JobPosting/>}/>
          <Route path='/organizations' element={<Organizations/>}/>
          <Route path='/organizations/:id' element={<Organization/>}/>
          <Route path='/applicants' element={<Applicants/>}/>
          <Route path='/applicants/:id' element={<Applicant/>}/>
          <Route path='/settings' element={<Settings/>}/>
          {/* <Route path='/employees' element= {<Employees/>}/> */}
          {/* <Route path='/messages' element={<Messages/>}/> */}

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
