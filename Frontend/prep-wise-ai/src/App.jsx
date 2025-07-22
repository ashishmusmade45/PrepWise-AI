import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";  

import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Home/Dashboard";
import InterviewPrep from "./Pages/InterviewPrep/InterviewPrep";
import { UserProvider } from "./context/userContext";

const App = ()=>{

    return (
      <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/interview-prep/:sessionId" element={<InterviewPrep/>}/>
          </Routes>
        </Router>

        <Toaster
        toastOptions={{
          className:"",
          style:{
            fontSize: "13px",
          },
        }}/>

      </div>
      </UserProvider>
    )
}

export default App