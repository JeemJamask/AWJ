import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Service1Page from "./Service1Page";
import Service2Page from "./Service2Page";
import CreateAccountPage from "./CreateAccountPage";
import Dashboard from "./Dashboard";
import BusinessModelResult from "./BusinessModelResult";
import BusinessModelPage from "./BusinessModelPage"; 
import CreateCompanyAccount from "./CreateCompanyAccount";
import GoalDecompose from "./GoalDecompose";
import SignIn from "./SignIn"; 
import Services from "./Services"; 
import "./style.css";
import HomePage from "./HomePage";
import GoalDecomposeResult from "./GoalDecomposingResult";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service-1" element={<Service1Page />} />
        <Route path="/service-2" element={<Service2Page />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-company-account" element={<CreateCompanyAccount />} />
        <Route path="/business-model" element={<BusinessModelPage />} /> 
        <Route path="/business-model-result" element={<BusinessModelResult />} />
        <Route path="/goal-decomposing" element={<GoalDecompose />} />
        <Route path="/goal-decomposing-result" element={<GoalDecomposeResult />} />

      </Routes>
    </Router>
  );

 

};

export default App;