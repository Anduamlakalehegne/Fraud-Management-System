import React from 'react'
import styles from "../../../asset/style/home.module.css"
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Footer from '../../../common/Footer';
import Header from '../../../common/Header';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaStarOfLife } from 'react-icons/fa';
import Swal from 'sweetalert2'
// import swal from "sweetalert";
import withReactContent from 'sweetalert2-react-content'
import 'animate.css';
import Axios from "axios"
import axios from 'axios';

const initialValues = {
    Description: "",
    fraudType: "",
    fraudMethod: "", 
    areaOfFraud: "",
    location: "",
    fraudamounttype: "",
    fraudamount: "",
    causeOfFraud: "",
    occerenceDate: "",
    typeoffraudster: "",
    amountRecoverd: "",
    fraudstername: "",
    actionTaken: "",
}

export default function Home() {

    const loggedInUser = JSON.parse(sessionStorage.getItem("user2"));
    console.log(loggedInUser.user_id);
    const formik = useFormik({
        initialValues: initialValues,

        validationSchema: Yup.object({
            Description: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('Decription Required'),

            fraudType: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('Fraud Type Required'),

            fraudMethod: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('Fraud Method Required'),

            areaOfFraud: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('Area Where the Fraud Occurred Required'),

            location: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('Location Required'),

            fraudamounttype: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('Fraud Amount Required'),

            causeOfFraud: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('Causes of fraud Required'),


        }),

        onSubmit: (values) => {
            //console.log(loggedInUser.user_id);
           

            const data = {
                description: values.Description,
                fraud_type: values.fraudType,
                fraud_method: values.fraudMethod, 
                areaof_fraud: values.areaOfFraud,
                location:values.location,
                fraud_amount_type:values.fraudamounttype,
                fraud_amount:values.fraudamount,
                cause_of_fraud: values.causeOfFraud,
                occerence_date: values.occerenceDate,
                type_of_fraudster: values.typeoffraudster, 
                fraudster_name: values.fraudstername,
                action_taken: values.actionTaken,
                amount_recoverd:"0",
                status:"Pending", 
                inserted_by: loggedInUser.user_id,
                

            };


            axios({
                method: 'POST',
                url: 'http://10.57.40.130:8022/api/insertFruad',
                data
            })
                .then(function (res) {
                    Swal.fire({
                        title: "Send Successfully",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000,
                    })
                })
                .catch(function (res) {
                    console.log(res)
                });

        },

    });

    return (
        <>
            <div className={styles.home}>
                <Header path="/CEO" />

                <form onSubmit={formik.handleSubmit}>

                    <div className={styles.alldiv}>

                        <h2 className={styles.title}>Fraud Management System</h2>

                        <div className={styles.form1}>
                            <label>Brief Description of The Fraud/Incident <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                            <div>
                                <textarea
                                    name='Description'
                                    id='Description'
                                    placeholder='Please Enter Discripion of The Fraud'
                                    onChange={formik.handleChange}
                                    value={formik.values.Description}
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.Description && formik.errors.Description ? styles.inputError : styles.inputSucess}
                                >
                                </textarea>
                                {formik.touched.Description && formik.errors.Description ? <label className={styles.errors}>{formik.errors.Description}</label> : null}
                            </div>
                        </div>

                        <div className={styles.allform}>

                            <div className={styles.form1}>
                                <label>Fraud Type <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <input
                                    name='fraudType'
                                    id='fraudType'
                                    onChange={formik.handleChange}
                                    value={formik.values.fraudType}
                                    placeholder='Please Enter Fraud Type'
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.fraudType && formik.errors.fraudType ? styles.inputError : null}
                                ></input>
                                {formik.touched.fraudType && formik.errors.fraudType ? <label className={styles.errors}>{formik.errors.fraudType}</label> : null}
                            </div>
                            <div className={styles.form1}>
                                <label>Fraud Method <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <input
                                    name='fraudMethod'
                                    id='fraudMethod'
                                    onChange={formik.handleChange}
                                    value={formik.values.fraudMethod}
                                    placeholder='Please Enter Fraud Method'
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.fraudMethod && formik.errors.fraudMethod ? styles.inputError : null}
                                >
                                </input>
                                {formik.touched.fraudMethod && formik.errors.fraudMethod ? <label className={styles.errors}>{formik.errors.fraudMethod}</label> : null}
                            </div>
                        </div>

                        <div className={styles.allform}>
                            <div className={styles.form1}>
                                <label>Name of the suspected Fraudster <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <select
                                    name='typeoffraudster'
                                    id='typeoffraudster'
                                    onChange={formik.handleChange}
                                    value={formik.values.typeoffraudster}
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.typeoffraudster && formik.errors.typeoffraudster ? styles.inputError : null}>
                                    <option value="">--- Select Name of the suspected Fraudster ---</option>
                                    <option value="Staff">Staff</option>
                                    <option value="Customer">Customer</option>
                                </select>
                                {formik.touched.typeoffraudster && formik.errors.typeoffraudster ? <label className={styles.errors}>{formik.errors.typeoffraudster}</label> : null}

                            </div>

                            <div className={styles.form1}>

                                {formik.values.typeoffraudster == "Staff" || formik.values.typeoffraudster == "Customer" ?
                                    <>
                                        <label> {formik.values.typeoffraudster == "Staff" ? "Enter Staff Name" : "Enter Customer Name"}<p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                        <input
                                            name='fraudstername'
                                            id='fraudstername'
                                            onChange={formik.handleChange}
                                            value={formik.values.fraudstername}
                                            onBlur={formik.handleBlur}
                                            className={formik.touched.fraudstername && formik.errors.fraudstername ? styles.inputError : null}>
                                        </input>
                                        {formik.touched.fraudstername && formik.errors.fraudstername ? <label className={styles.errors}>{formik.errors.fraudstername}</label> : null}
                                    </> : ""}
                            </div>
                        </div>

                        <div className={styles.form1}>
                            <label>Place/ Area where the Froud Occurred <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>

                            <div className={styles.allform}>
                                <div>
                                    <label style={{ marginTop: '-10px' }}>Branch <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                    <select
                                        name='areaOfFraud'
                                        id='areaOfFraud'
                                        onChange={formik.handleChange}
                                        value={formik.values.areaOfFraud}
                                        onBlur={formik.handleBlur}
                                        className={formik.touched.areaOfFraud && formik.errors.areaOfFraud ? styles.inputError : null}>
                                        <option value="">--- Select branch ---</option>
                                        <option>branch 1</option>
                                        <option>branch 2</option>
                                        <option>branch 3</option>
                                    </select>
                                    {formik.touched.areaOfFraud && formik.errors.areaOfFraud ? <label className={styles.errors}>{formik.errors.areaOfFraud}</label> : null}

                                </div>

                                <div>
                                    <label style={{ marginTop: '-10px' }}>Location <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                    <input
                                        type="text"
                                        name='location'
                                        id='location'
                                        onChange={formik.handleChange}
                                        value={formik.values.location}
                                        onBlur={formik.handleBlur}
                                        className={formik.touched.location && formik.errors.location ? styles.inputError : null}
                                        placeholder='Please Enter Causes of Fraud'>
                                    </input>
                                    {formik.touched.location && formik.errors.location ? <label className={styles.errors}>{formik.errors.location}</label> : null}
                                </div>
                            </div>
                        </div>

                        <div className={styles.allform}>

                            <div className={styles.form1}>
                                <label>Causes of Fraud <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <div>
                                    <input
                                        type="text"
                                        name='causeOfFraud'
                                        id='causeOfFraud'
                                        onChange={formik.handleChange}
                                        value={formik.values.causeOfFraud}
                                        onBlur={formik.handleBlur}
                                        className={formik.touched.causeOfFraud && formik.errors.causeOfFraud ? styles.inputError : null}
                                        placeholder='Please Enter Causes of Fraud'></input>
                                </div>
                                {formik.touched.causeOfFraud && formik.errors.causeOfFraud ? <label className={styles.errors}>{formik.errors.causeOfFraud}</label> : null}
                            </div>

                            <div className={styles.form1}>
                                <label>Date of Occerence of the Fraud <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <div>
                                    <input
                                        type="date"
                                        name='occerenceDate'
                                        id='occerenceDate'
                                        onChange={formik.handleChange}
                                        value={formik.values.occerenceDate}
                                        onBlur={formik.handleBlur}
                                        className={formik.touched.occerenceDate && formik.errors.occerenceDate ? styles.inputError : null}
                                    ></input>
                                    {formik.touched.occerenceDate && formik.errors.occerenceDate ? <label className={styles.errors}>{formik.errors.occerenceDate}</label> : null}
                                </div>
                            </div>
                        </div>

                        <div className={styles.allform}>

                            <div className={styles.form1}>

                                <label>Fraud Amount <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <select
                                    name='fraudamounttype'
                                    id='fraudamounttype'
                                    onChange={formik.handleChange}
                                    value={formik.values.fraudamounttype}
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.fraudamounttype && formik.errors.fraudamounttype ? styles.inputError : null}>
                                    <option value="">-- Select Fraud Amount --</option>
                                    <option value="Actual">Actual</option>
                                    <option value="Estimated">Estimated</option>
                                    <option value="Non">Non</option>
                                </select>
                                {formik.touched.fraudamounttype && formik.errors.fraudamounttype ? <label className={styles.errors}>{formik.errors.fraudamounttype}</label> : null}
                            </div>
                            <div className={styles.form1}>

                                {formik.values.fraudamounttype == "Actual" || formik.values.fraudamounttype == "Estimated" ?
                                    <>
                                        <label> {formik.values.fraudamounttype == "Actual" ? " Enter Actual Amount" : "Enter Estimated Amount"} <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                        <input
                                            name='fraudamount'
                                            id='fraudamount'
                                            onChange={formik.handleChange}
                                            value={formik.values.fraudamount}
                                            onBlur={formik.handleBlur}
                                            className={formik.touched.fraudamount && formik.errors.fraudamount ? styles.inputError : null}>
                                        </input>
                                        {formik.touched.fraudamount && formik.errors.fraudamount ? <label className={styles.errors}>{formik.errors.fraudamount}</label> : null}
                                    </>
                                    : ""}
                            </div>


                        </div>



                        <div className={styles.form1}>
                            <label>Action Taken or Proposed to be Taken to Avoid such Incidents <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                            <div>
                                <textarea
                                    type="text"
                                    name='actionTaken'
                                    id='actionTaken'
                                    onChange={formik.handleChange}
                                    value={formik.values.actionTaken}
                                    placeholder='Please Enter Action Taken'
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.actionTaken && formik.errors.actionTaken ? styles.inputError : null}>
                                </textarea>
                                {formik.touched.actionTaken && formik.errors.actionTaken ? <label className={styles.errors}>{formik.errors.actionTaken}</label> : null}
                            </div>
                        </div>

                        <div>
                            <button type="submit" className={styles.button}>Submit</button>
                            {/* onClick={() => { addProjects()}}  */}
                        </div>
                    </div>
                </form>
            </div>

            <Footer />

        </>
    )
}
