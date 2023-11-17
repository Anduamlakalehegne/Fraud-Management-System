import React from "react";
import styles from "../../../asset/style/home.module.css";
import { useState } from "react";

import Footer from "../../../common/Footer";
import Header from "../../../common/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaStarOfLife } from "react-icons/fa";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import RadioGroup from '@mui/material/RadioGroup';
import "animate.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import axios from "axios";
import { useParams } from "react-router-dom";

const apiConfig = {
  baseUrl: "http://10.57.40.130:8022/api",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function AssignHrDep() {
  const loggedInUser = JSON.parse(sessionStorage.getItem("user2"));

  const { id } = useParams();
  const { description } = useParams();
  //console.log(id);

  const [formState, setFormState] = useState({
    hr: false,
    legal: false,
  });

  const initialValues = {
    fraudID: id,
    description: description,
    remark: "",
    hr: false,
    legal: false,
  };

  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: Yup.object({
      fraudID: Yup.string()
        .max(1000, "Must be 15 characters")
        .required("Fraud Id Required"),

      remark: Yup.string()
        .max(1000, "Must be 15 characters")
        .required("Remark  Required"),



    }),

    onSubmit: async (values) => {
      try {
        if (values.hr) {
          const [hrResponse] = await Promise.all([
            axios.post(`${apiConfig.baseUrl}/assignTdmFruad`, getHRData(values), {
              headers: apiConfig.headers,
            }),

          ]);

          console.log(hrResponse.data);

          Swal.fire({
            title: "Send Successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });




        }
        else {
          Swal.fire({
            title: "Please select one assignation",
            icon: "error",
            showConfirmButton: true,
            timer: 3000,
          });
        }
      } catch (error) {
        console.error(error);

        Swal.fire({
          title: "Error",
          text: "An error occurred while submitting the form. Please try again later.",
          icon: "error",
          showConfirmButton: true,
          timer: 3000,
        });
      }
    },
  });

  const getHRData = (values) => {
    return {
      fraud_id: id.toString(),
      assigned_by: loggedInUser.user_id.toString(),
      assigned_to: "6",
      remark: values.remark,
      action_taken_by_dc: values.dcd,
    };
  };

  // const getLegalData = (values) => {
  //   return {
  //     fraud_id: id.toString(),
  //     assigned_by: loggedInUser.user_id.toString(),
  //     assigned_to: "6",
  //     remark: values.remark,
  //     action_taken_by_dc: values.dcd,
  //   };
  // };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: checked }));
    formik.setFieldValue(name, checked)
  };
  return (
    <>
      <div className={styles.home}>
        <Header path="/humanCapital" />

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.alldiv} style={{ paddingBottom: "10px" }}>
            <h2 className={styles.title}> Assign Fraud </h2>

            <div className={styles.form1} style={{ width: "47%" }}>
              <label>
                {" "}
                Fraud ID{" "}
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
                name="fraudID"
                id="fraudID"
                onChange={formik.handleChange}
                value={formik.values.fraudID}
                placeholder="Fraud ID"
                onBlur={formik.handleBlur}
                className={
                  formik.touched.fraudID && formik.errors.fraudID
                    ? styles.inputError
                    : null
                }
              ></input>
              {formik.touched.fraudID && formik.errors.fraudID ? (
                <label className={styles.errors}>{formik.errors.fraudID}</label>
              ) : null}
            </div>
            <div className={styles.allform}>
              <div className={styles.form1}>
                <label>
                  description{" "}
                  <p>
                    <FaStarOfLife
                      style={{ marginBottom: "12px" }}
                      className="icon"
                      size="0.5rem"
                      color="red"
                    ></FaStarOfLife>
                  </p>
                </label>
                <div>
                  <textarea
                    name="description"
                    id="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    placeholder="Input description"
                    onBlur={formik.handleBlur}

                  ></textarea>

                </div>
              </div>
            </div>

            <div className={styles.allform}>
              <div className={styles.form1}>
                <label>
                  Remark{" "}
                  <p>
                    <FaStarOfLife
                      style={{ marginBottom: "12px" }}
                      className="icon"
                      size="0.5rem"
                      color="red"
                    ></FaStarOfLife>
                  </p>
                </label>
                <div>
                  <textarea
                    name="remark"
                    id="remark"
                    onChange={formik.handleChange}
                    value={formik.values.remark}
                    placeholder="Input Remark"
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.remark && formik.errors.remark
                        ? styles.inputError
                        : null
                    }
                  ></textarea>
                  {formik.touched.remark && formik.errors.remark ? (
                    <label className={styles.errors}>
                      {formik.errors.remark}
                    </label>
                  ) : null}
                </div>
              </div>
            </div>

            <div className={styles.allform}>

              <div className={styles.form1}>
                <label>
                  <RadioGroup

                  >

                    {/* <p>
                      <FaStarOfLife
                        style={{ marginBottom: "12px" }}
                        className="icon"
                        size="0.5rem"
                        color="red"
                      ></FaStarOfLife> 
                    </p>*/}
                    Talent Managment{" "}
                    <input
                      id="hr"
                      name="hr"
                      label="Talent"
                      type="checkbox"
                      checked={formState.hr}
                      onBlur={handleChange}
                      onChange={handleChange}
                    />
                  </RadioGroup>

                </label>
              </div>
            </div>
            <hr />
            <div>
              <Button variant="contained" type="submit">
                Submit
              </Button>
              {/* onClick={() => { addProjects()}}  */}
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}
