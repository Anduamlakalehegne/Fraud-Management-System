import './App.css';
import { Routes, Route, Link, useNavigate, Navigate, Router } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import Report from './Components/Pages/Audit/Report';
import Home from './Components/Pages/Audit/Home';
import ActionTaken from './Components/Pages/Audit/ActionTaken';
import HumanCapital from './Components/Pages/Human Capital/HumanCapital';
import Login from './Components/Pages/Login/Login';
import HR_ActionTaken from './Components/Pages/Human Capital/HR_ActionTaken';
import LegalAction_Report from './Components/Pages/Legal Action/LegalAction_Report';
import LegalAction from './Components/Pages/Legal Action/LegalAction';
import CEO_REPORT from './Components/Pages/CEO/CEO_REPORT';
import LegalReport from './Components/Pages/CEO/LegalReport';
import HR_Report from './Components/Pages/CEO/HR_Report';
import ActionTakenReport from './Components/Pages/Audit/ActionTakenReport';
import ActionTakenReportHr from './Components/Pages/Human Capital/ActionTakenReportHr';
import ActionTakenReportLegal from './Components/Pages/Legal Action/ActionTakenReportLegal';
import AssignedDepartementReport from './Components/Pages/CEO/AssignedDepartementReport';
import AssignDep from './Components/Pages/CEO/AssignDep';
import Dashboard from './Components/Pages/CEO/Dashboard';
import TalentManagment from './Components/Pages/TalentManagment/TalentManagment';
import { useEffect } from 'react';
import AssignHrDep from './Components/Pages/Human Capital/AssignHrDep';
import TDM_ActionTaken from './Components/Pages/TalentManagment/TDM_ActionTaken';
import RollBackAction from './Components/Pages/TalentManagment/RollBackAction';
import TaskStep from './Components/Pages/TalentManagment/TaskStep';
import Benefit from './Components/Pages/Benefit/Benefit';
import Benefit_ActionTaken from './Components/Pages/Benefit/Benefit_ActionTaken';
import BenfitActionTakenReport from './Components/Pages/Benefit/BenfitActionTakenReport';
import AssignedTdmDepartementReport from './Components/Pages/Human Capital/AssignedTdmDepartementReport';
import TDMFraudProcssesingStep from './Components/Pages/Human Capital/TDMFraudProcssesingStep';
import TDMFraudProcssesingStepR from './Components/Pages/TalentManagment/TDMFraudProcssesingStepR';
import TDMFraudProcssesingStepCEOR from './Components/Pages/CEO/TDMFraudProcssesingStepCEOR';
import TDMFraudProcssesingStepAudit from './Components/Pages/Audit/TDMFraudProcssesingStepCEOR';
import ProfileManagment from './Components/Pages/Login/ProfileManagment';

function App() {
  



// const isAuthenticated = !!sessionStorage.getItem("user2");
// const navigate = useNavigate();

// useEffect(() => {
  
//   // Check if the user is authenticated
//   const storedData = JSON.parse(sessionStorage.getItem("user2"));
//   if (!storedData) {
//     //navigate("/");

//     window.location.href = "/";
//   }else if (storedData.role === "audit") {

//     navigate("/home");
//   } else if (storedData.role === "CEO") {
//     navigate("/dashboard");

//   } else if (storedData.role === "HR") {
//     navigate("/humanCapital");

//   } else if (storedData.role === "legal") {
//     navigate("/LegalAction_Report");

//   } else if (storedData.role === "TDM") {
//     navigate("/TalentManagment");

//   } else if (storedData.role === "Benefit") {
//     navigate("/Benefit_tdm");
//   } else {
//     navigate("/")
//   }
// }, []);



  return (

    <BrowserRouter>
      <div className="App">

        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/report' element={<Report />}></Route>
          <Route path='/actionTaken/:id' element={<ActionTaken />}></Route>
          <Route path='/humanCapital' element={<HumanCapital />}></Route>
          <Route path='/HR_ActionTaken/:id' element={<HR_ActionTaken />}></Route>
          <Route path='/LegalAction_Report' element={<LegalAction_Report />}></Route>
          <Route path='/legalAction/:id' element={<LegalAction />}></Route>
          <Route path='/ceoreport' element={<CEO_REPORT />}></Route>
          <Route path='/legalreport/:id' element={<LegalReport />}></Route>
          <Route path='/hrreport' element={<HR_Report />}></Route>
          <Route path='/actiontaken_report' element={<ActionTakenReport />}> </Route>
          <Route path='/hractiontaken/:id' element={<ActionTakenReportHr />}> </Route>
          <Route path='/legalactiontaken' element={<ActionTakenReportLegal />}> </Route>
          <Route path='/assigneddepartemnt' element={<AssignedDepartementReport />}> </Route>
          <Route path='/assigndep/:id/:description' element={<AssignDep />}> </Route>
          <Route path='/dashboard' element={<Dashboard />}> </Route>
          <Route path='/talentmanagment' element={<TalentManagment />}> </Route>
          <Route path='/assignHrdep/:id/:description' element={<AssignHrDep />}></Route>
          <Route path='/Tdm_action_taken/:id/:fra_amount' element={<TDM_ActionTaken />}></Route>
          <Route path='/rollbackaction/:id' element={<RollBackAction />}></Route>
          <Route path='/taskStepstdm/:id' element={<TaskStep />}></Route>
          <Route path='/Benefit_tdm' element={<Benefit />}></Route>
          <Route path='/Benefit_ActionTaken/:id/:fra_amount' element={<Benefit_ActionTaken />}></Route>
          <Route path='/assgnedTdmDep' element={<AssignedTdmDepartementReport />}></Route>
          <Route path='/tdmProcessingrepothr/:id' element={<TDMFraudProcssesingStep />}></Route>
          <Route path='/tdmprocessingreporttd/:id' element={<TDMFraudProcssesingStepR />}></Route>
          <Route path='/tdmprocessingreportceo/:id' element={<TDMFraudProcssesingStepCEOR />}></Route>
          <Route path='/tdmprocessingreportAudit/:id' element={<TDMFraudProcssesingStepAudit />}></Route>
          <Route path='/benfitActionTakenReport/:id' element={<BenfitActionTakenReport />}></Route>
          <Route path='/profile_managment' element={<ProfileManagment />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
const AuthComponent = () => {
  const navigate = useNavigate();
  const storedData = JSON.parse(sessionStorage.getItem("user2"));

  useEffect(() => {
    if (!storedData) {
      window.location.href = "/";
    } else {
      navigateBasedOnRole(storedData);
    }
  }, [storedData]);

  const navigateBasedOnRole = (data) => {
    switch (data.role) {
      case "audit":
        navigate("/home");
        break;
      case "CEO":
        navigate("/dashboard");
        break;
      case "HR":
        navigate("/humanCapital");
        break;
      case "legal":
        navigate("/LegalAction_Report");
        break;
      case "TDM":
        navigate("/TalentManagment");
        break;
      case "Benefit":
        navigate("/Benefit_tdm");
        break;
      default:
        navigate("/");
    }
  };

  // You can also return a loading indicator or something else if needed
  return null;
};

export default App;
