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
import { useParams } from "react-router-dom";

export default function LegalAction() {
  const loggedInUser = JSON.parse(sessionStorage.getItem("user2"));
  //console.log(loggedInUser.user_id);
  const { id } = useParams();

  const initialValues = {
    fraudID: id,
    Status_of_Pre_Litigation_action: "",
    court_decision: "",
    amount_Recoverd_Lost: "",
    remark: "",
  };
  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: Yup.object({
      fraudID: Yup.string()
        .max(1000, "Must be 1000 characters")
        .required("Fraud ID Required"),

      // Status_of_Pre_Litigation_action: Yup.string()
      //   .max(10000, "Must be 1000 characters")
      //   .required("Status of Pre Litigation Action Required"),

      // court_decision: Yup.string()
      //   .max(1000, "Must be 1000 characters")
      //   .required("Court Decision Required"),

      amount_Recoverd_Lost: Yup.string()
        .max(1000, "Must be 1000 characters")
        .required("Amount Recoverd Lost Required"),
      remark: Yup.string()
        .max(1000, "Must be 1000 characters")
        .required("Amount Recoverd Lost Required"),
    }),

    onSubmit: (values) => {
      const data = {
        fraud_id: values.fraudID,
        status_of_pre_litigation: values.Status_of_Pre_Litigation_action,
        court_decision: values.court_decision,
        amount_recovered: values.amount_Recoverd_Lost,
        inserted_by: loggedInUser.user_id,
        status: "Processed",
        remark: values.remark,
      };
      axios({
        method: "POST",
        url: "http://10.57.40.130:8022/api/insertLegal",
        data,
      })
        .then(function (res) {
          Swal.fire({
            title: "Send Successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch(function (res) {
          console.log(res);
        });
    },
  });

  return (
    <>
      <div className={styles.home}>
        <Header path="/legalAction" />

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.alldiv} style={{ paddingBottom: "10px" }}>
            <h2 className={styles.title}>Legal Action</h2>

            <div className={styles.allform}>
              <div className={styles.form1}>
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
                  placeholder="Please Enter Fraud ID. . ."
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.fraudID && formik.errors.fraudID
                      ? styles.inputError
                      : null
                  }
                ></input>
                {formik.touched.fraudID && formik.errors.fraudID ? (
                  <label className={styles.errors}>
                    {formik.errors.fraudID}
                  </label>
                ) : null}
              </div>


            </div>

            <div className={styles.allform}>
              <div className={styles.form1}>
                <label>
                  Amount Recoverd/Lost{" "}
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
                  name="amount_Recoverd_Lost"
                  id="amount_Recoverd_Lost"
                  onChange={formik.handleChange}
                  value={formik.values.amount_Recoverd_Lost}
                  placeholder="Please Enter Fraud Method"
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.amount_Recoverd_Lost &&
                      formik.errors.amount_Recoverd_Lost
                      ? styles.inputError
                      : null
                  }
                ></input>
                {formik.touched.amount_Recoverd_Lost &&
                  formik.errors.amount_Recoverd_Lost ? (
                  <label className={styles.errors}>
                    {formik.errors.amount_Recoverd_Lost}
                  </label>
                ) : null}
              </div>
              <div className={styles.form1}>
                <label style={{ textAlign: "left", marginBottom: "3px" }}>
                  Remark
                </label>
                <div>
                  <input
                    type="text"
                    name="remark"
                    id="remark"
                    placeholder="Please Enter Action Taken. . ."
                    onChange={formik.handleChange}
                    value={formik.values.remark}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.remark && formik.errors.remark
                        ? styles.inputError
                        : null
                    }
                  ></input>
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
                  Select Action
                  <p>
                    <FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife>
                  </p>
                </label>
                <select
                  name='action_of_legal'
                  id='action_of_legal'
                  onChange={formik.handleChange}
                  value={formik.values.action_of_legal}
                  onBlur={formik.handleBlur}
                  className={formik.touched.action_of_legal && formik.errors.action_of_legal ? styles.inputError : null}>
                  <option value="" disabled>--- Select Legal Action ---</option>
                  <option value="court_descison">Court Decision</option>
                  <option value="pre_littigation_action">Status of Pre-Litigation action</option>
                </select>
                {formik.touched.action_of_legal && formik.errors.action_of_legal ? <label className={styles.errors}>{formik.errors.action_of_legal}</label> : null}
              </div>

              <div className={styles.form1}>
                {formik.values.action_of_legal === "pre_littigation_action" ? (
                  <div className={styles.form1}>
                    <label>
                      Status of Pre-Litigation action
                      <p>
                        <FaStarOfLife style={{ marginBottom: "12px" }} className="icon" size="0.5rem" color="red"></FaStarOfLife>
                      </p>
                    </label>
                    <input
                      name="Status_of_Pre_Litigation_action"
                      id="Status_of_Pre_Litigation_action"
                      onChange={formik.handleChange}
                      value={formik.values.Status_of_Pre_Litigation_action}
                      placeholder="Please Enter Status of Pre Litigation action"
                      onBlur={formik.handleBlur}
                      className={formik.touched.Status_of_Pre_Litigation_action && formik.errors.Status_of_Pre_Litigation_action ? styles.inputError : null}
                    />
                    {formik.touched.Status_of_Pre_Litigation_action && formik.errors.Status_of_Pre_Litigation_action ? (
                      <label className={styles.errors}>
                        {formik.errors.Status_of_Pre_Litigation_action}
                      </label>
                    ) : null}
                  </div>
                ) : null}

                {formik.values.action_of_legal === "court_descison" ? (
                  <div className={styles.form1}>
                    <label>
                      Court Decision
                      <p>
                        <FaStarOfLife style={{ marginBottom: "12px" }} className="icon" size="0.5rem" color="red"></FaStarOfLife>
                      </p>
                    </label>
                    <input
                      name="court_decision"
                      id="court_decision"
                      onChange={formik.handleChange}
                      value={formik.values.court_decision}
                      placeholder="Please Enter Court Decision..."
                      onBlur={formik.handleBlur}
                      className={formik.touched.court_decision && formik.errors.court_decision ? styles.inputError : null}
                    />
                    {formik.touched.court_decision && formik.errors.court_decision ? (
                      <label className={styles.errors}>
                        {formik.errors.court_decision}
                      </label>
                    ) : null}
                  </div>
                ) : null}
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
