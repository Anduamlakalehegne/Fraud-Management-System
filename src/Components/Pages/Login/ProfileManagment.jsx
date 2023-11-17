import React from "react";
import styles from "../../../asset/style/home.module.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Footer from "../../../common/Footer";
import Header from "../../../common/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaStarOfLife } from "react-icons/fa";
import Swal from "sweetalert2";
// import swal from "sweetalert";
import withReactContent from "sweetalert2-react-content";
import "animate.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";

export default function ProfileManagment() {
  
  const loggedInUser = JSON.parse(sessionStorage.getItem("user2"));
  //console.log(loggedInUser.user_id);
  //const { id } = useParams();
  const [pathData, setPathData] = useState("");
  console.log(pathData);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser.role === "audit") {

      setPathData("/home");
    } else if (loggedInUser.role === "CEO") {
      setPathData("/CEO");

    } else if (loggedInUser.role === "HR") {
      setPathData("/TalentManagment");

    } else if (loggedInUser.role === "legal") {
      setPathData("/legalAction");

    } else if (loggedInUser.role === "TDM") {
      setPathData("/TalentManagment");

    } else if (loggedInUser.role === "Benefit") {
      setPathData("/Benefit_tdm");
    } else {
      setPathData("/")
    }
  }, []);

  const initialValues = {
    UserName: loggedInUser.user_name,
    
    newPassword: "",
    newConfirmPassword: "",
   
  };
  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: Yup.object({
      UserName: Yup.string()
        .max(1000, "Must be 1000 characters")
        .required("UserName Is Required"),

      newConfirmPassword: Yup.string()
        .max(1000, "Must be 1000 characters")
        .required("Password Confirmation Required"),
        newPassword: Yup.string()
        .max(1000, "Must be 1000 characters")
        .required("Please Enter the New Password"),
    }),

  
    onSubmit: (values) => {

     if(values.newPassword !== values.newConfirmPassword){
     
        Swal.fire({
          title: "The New Password and Confirm Password is not a match",
          icon:"error",
          showConfirmButton: false,
          timer: 2000,
        });
      

     }else{

      const data = {
        user_id: loggedInUser.user_id,
        new_password: values.newPassword,
      };
      axios({
        method: "POST",
        url: "http://10.57.40.130:8022/api/updatePassword",
        data,
      })
        .then(function (res) {
          Swal.fire({
            title: "Password Successfully Changed",
            icon: "success",
            showConfirmButton: false,
            timer: 2500,
          });

          sessionStorage.removeItem("user2");
          navigate("/");

        })
        .catch(function (res) {
          Swal.fire({
            title: res,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        });
     }
      
    },
  });

  return (
    <>
      <div className={styles.home}>
        <Header path={pathData} />

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.alldiv} style={{ paddingBottom: "10px" }}>
            <h2 className={styles.title}>Update Password</h2>

            <div className={styles.allform}>
              <div className={styles.form1}>
                <label>
                  {" "}
                  User name{" "}
                  <p>
                    <FaStarOfLife
                      style={{ marginBottom: "12px" }}
                      className="icon"
                      size="0.5rem"
                      color="red"
                    ></FaStarOfLife>
                  </p>
                </label>
                <input
                  name="UserName"
                  id="UserName"
                  onChange={formik.handleChange}
                  value={loggedInUser.user_name}
                  placeholder="Please Enter Fraud ID. . ."
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.UserName && formik.errors.UserName
                      ? styles.inputError
                      : null
                  }
                ></input>
                {formik.touched.UserName && formik.errors.UserName ? (
                  <label className={styles.errors}>
                    {formik.errors.UserName}
                  </label>
                ) : null}
              </div>


            </div>

            <div className={styles.allform}>
              <div className={styles.form1}>
                <label>
                  Current Password{" "}
                  <p>
                    <FaStarOfLife
                      style={{ marginBottom: "12px" }}
                      className="icon"
                      size="0.5rem"
                      color="red"
                    ></FaStarOfLife>
                  </p>
                </label>
                <input
                  name="CurrentPassword"
                  id="CurrentPassword"
                  onChange={formik.handleChange}
                  value={loggedInUser.password}
                  placeholder="Please Enter Fraud Method"
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.CurrentPassword &&
                      formik.errors.CurrentPassword
                      ? styles.inputError
                      : null
                  }
                ></input>
                {formik.touched.CurrentPassword &&
                  formik.errors.CurrentPassword ? (
                  <label className={styles.errors}>
                    {formik.errors.CurrentPassword}
                  </label>
                ) : null}
              </div>
              
            </div>

            <div className={styles.allform}>

            <div className={styles.form1}>
                <label style={{ textAlign: "left", marginBottom: "3px" }}>
                  New Password
                </label>
                <div>
                  <input
                    type="text"
                    name="newPassword"
                    id="newPassword"
                    placeholder="Please Enter Action Taken. . ."
                    onChange={formik.handleChange}
                    value={formik.values.newPassword}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.newPassword && formik.errors.newPassword
                        ? styles.inputError
                        : null
                    }
                  ></input>
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <label className={styles.errors}>
                      {formik.errors.newPassword}
                    </label>
                  ) : null}
                </div>
              </div>

            </div>
            <div className={styles.allform}>

            <div className={styles.form1}>
            <label style={{ textAlign: "left", marginBottom: "3px" }}>
              Confirm New Password
            </label>
            <div>
              <input
                type="text"
                name="newConfirmPassword"
                id="newConfirmPassword"
                placeholder="Please Enter Action Taken. . ."
                onChange={formik.handleChange}
                value={formik.values.newConfirmPassword}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.newConfirmPassword && formik.errors.newConfirmPassword
                    ? styles.inputError
                    : null
                }
              ></input>
              {formik.touched.newConfirmPassword && formik.errors.newConfirmPassword ? (
                <label className={styles.errors}>
                  {formik.errors.newConfirmPassword}
                </label>
              ) : null}
            </div>
          </div>

            </div>
            


            <div>
              <button type="submit" className={styles.button}>
                Submit
              </button>
              {/* onClick={() => { addProjects()}}  */}
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}
