import React, { useState, useEffect } from "react";
import "../asset/style/header.module.css";
import './styles.css'
import { Routes, Route, Link, useNavigate, Navigate, Router } from "react-router-dom";
import { IoArrowDownOutline } from "react-icons/io5";
import Swal from 'sweetalert2';
import "rsuite/dist/rsuite.min.css";
import { Button, ButtonToolbar } from 'rsuite';
import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';
import 'animate.css';

export default function Header({ path }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user2");
    

    navigate("/");

    //window.location.href = "/";
  };

  const getColor = () => {
    return '#ff6b0b'
  }
  const getColor2 = () => {
    return '#dadada'
  }

  return (


    <>

      <>
        <div className={`navigation ${scrolled ? "scrolled" : ""}`}>
          <div>
            <p className="wegagenLogo"></p>
          </div>

          <div className="navigationContents">

            <Navbar>
              <Nav style={{ backgroundColor: '#004360' }} className={`navbarWhat ${scrolled ? "scrolled" : ""}`} >

                {path === "/home" || path === "/actionTaken" || path === "/report" ?
                  <>
                    <Nav.Item className="animate__animated animate__fadeInRight"> <Link to="/home" style={path === "/home" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Home</Link></Nav.Item>
                    {/* <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/actionTaken" style={path === "/actionTaken" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Action Taken</Link></Nav.Item> */}
                    <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/report" style={path === "/report" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Report</Link></Nav.Item>
                    {/* <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/actiontaken_report" style={path === "/actiontaken_report" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Action Taken Report</Link></Nav.Item> */}
                  </>
                  : ""}
                {path === "/humanCapital" ?
                  <>

                    <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/humanCapital" style={path === "/humanCapital" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Fraud</Link></Nav.Item>
                    {/* <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/tdmProcessingrepothr" style={path === "/tdmProcessingrepothr" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Talent Managment Report</Link></Nav.Item> */}
                    <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/assgnedTdmDep" style={path === "/assgnedTdmDep" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Assigning Report</Link></Nav.Item>
                    {/* <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/HR_ActionTaken" style={path === "/HR_ActionTaken" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >HR_ActionTaken</Link></Nav.Item> */}
                    {/* <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/hractiontaken" style={path === "/hractiontaken" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Action Taken Report</Link></Nav.Item> */}
                  </>
                  : ""}
                {path === "/legalAction" ?
                  <>
                    <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/LegalAction_Report" style={path === "/LegalAction_Report" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Fraud</Link></Nav.Item>
                    {/* <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/legalAction" style={path === "/legalAction" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Legal Action</Link></Nav.Item> */}
                    <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/legalactiontaken" style={path === "/legalactiontaken" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Action Taken Report</Link></Nav.Item>
                  </>
                  : ""}
                {path === "/CEO" ?
                  <>
                    <Nav.Item className="animate__animated animate__fadeInRight"> <Link to="/ceoreport" style={path === "/ceoreport" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Home</Link></Nav.Item>
                    {/* <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/legalreport" style={path === "/legalreport" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Legal Report</Link></Nav.Item>
                    <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/hrreport" style={path === "/hrreport" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >HR Report</Link></Nav.Item> */}
                    <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/assigneddepartemnt" style={path === "/hrreport" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Assigned Department Report</Link></Nav.Item>
                    <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/dashboard" style={path === "/dashboard" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Dashboard </Link></Nav.Item>
                  </>
                  : ""}

                {path === "/TalentManagment" ?
                  <>
                    <Nav.Item className="animate__animated animate__fadeInRight"> <Link to="/talentmanagment" style={path === "/talentmanagment" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Home</Link></Nav.Item>
                    {/* <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/tdmProcessingrepothr" style={path === "/tdmProcessingrepothr" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Talent Managment Report</Link></Nav.Item> */}
                    {/*<Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/hrreport" style={path === "/hrreport" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >HR Report</Link></Nav.Item>
                     <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/assigneddepartemnt" style={path === "/hrreport" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Assigned Department Report</Link></Nav.Item>
                     <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/dashboard" style={path === "/dashboard" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Dashboard </Link></Nav.Item> */}
                  </>
                  : ""}

                {path === "/Benefit_tdm" ?
                  <>
                    <Nav.Item className="animate__animated animate__fadeInRight"> <Link to="/Benefit_tdm" style={path === "/Benefit_tdm" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Home</Link></Nav.Item>

                    {/* <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/legalreport" style={path === "/legalreport" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Legal Report</Link></Nav.Item>
                     <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/hrreport" style={path === "/hrreport" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >HR Report</Link></Nav.Item>
                    
                     <Nav.Item className="animate__animated animate__fadeInRight" > <Link to="/dashboard" style={path === "/dashboard" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >Dashboard </Link></Nav.Item> */}
                  </>
                  : ""}


                <Nav.Menu appearance='subtle' title="Logout" placement="bottomStart" className="animate__animated animate__fadeInRight" style={path === "aboutUs" ? { color: getColor() } : { color: getColor2(), textDecoration: 'none' }} >
                  <div style={{ display: "grid", }} >
                    <Nav.Item style={{ marginBottom: "-6px", }}> <Link to="/profile_managment" style={path === "/profile_managment" ? { color: 'black'} : { color: 'black', textDecoration: 'none' }}> Update Profile</Link> </Nav.Item>
                    <Nav.Item onClick={handleLogout}><Link to="/" > Log Out </Link></Nav.Item>
                  </div>
                </Nav.Menu>

              </Nav>
            </Navbar>
          </div>
        </div>
      </>

      {/* <div className="menuArea">
                <h1 class="logo"></h1>
                <ul>
                    <li>
                        <Link style={path == "/" ? { color: getColor(), textDecoration: "none" } : { color: getColor2(), textDecoration: "none" }} to="/">Home <label></label>
                            <div className="dropdown-menu">
                                <ul>
                                    <li> <Link style={path == "/" ? { color: getColor(), textDecoration: "none" } : { color: getColor2(), textDecoration: "none" }} to="/">Home </Link></li>
                                    <li><Link style={path == "/report" ? { color: getColor(), textDecoration: "none" } : { color: getColor2(), textDecoration: "none" }} to="/report">Report </Link></li>
                                    <li> <Link style={path == "/#" ? { color: getColor(), textDecoration: "none" } : { color: getColor2(), textDecoration: "none" }} to="/"> Profile </Link></li>
                                </ul>
                            </div>
                        </Link>
                    </li>
                     <li><Link style={path == "/report" ? { color: getColor(), textDecoration: "none" } : { color: getColor2(), textDecoration: "none" }} to="/report">Report </Link></li>
                    <li onClick={() => { toggle() }}> <Link style={path == "/#" ? { color: getColor(), textDecoration: "none" } : { color: getColor2(), textDecoration: "none" }} to="/">Profile </Link></li>
                </ul>
            </div> */}
    </>
  )
} 