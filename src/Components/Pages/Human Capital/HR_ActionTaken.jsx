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
import { useParams } from 'react-router-dom';


export default function HR_ActionTaken() {

    const loggedInUser = JSON.parse(sessionStorage.getItem("user2"));
    //console.log(loggedInUser.user_id);
    const {id} = useParams();
   
    const initialValues = {
        fraudID: id,
        Action_Taken_by_HCO: "",
        Action_Taken_by_TMD: "",
        Action_Taken_by_DC: "",
        Decision_of_CHCO: "",
        Action_Taken_by_DTM: "",
        action_taken_by_DEB_PM: "",
        remark:"",
    }
    

    const formik = useFormik({
        initialValues: initialValues,

        validationSchema: Yup.object({
            fraudID: Yup.string()
                .max(100, "Must be 15 characters")
                .required('Fraud ID Required'),

            Action_Taken_by_HCO: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('This Field is Required'),

            Action_Taken_by_TMD: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('This Field is Required'),

            Action_Taken_by_DC: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('This Field is Required'),

            Decision_of_CHCO: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('This Field is Required'),

            Action_Taken_by_DTM: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('This Field is Required'),

            action_taken_by_DEB_PM: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('This Field is Required'),
            remark: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('This Field is Required'),

        }),

        onSubmit: (values) => {

            const data = {
                fraud_id: values.fraudID,
                action_taken_by_chco: values.Action_Taken_by_HCO,
                action_taken_by_tmd: values.Action_Taken_by_TMD,
                action_taken_dc: values.Action_Taken_by_DC,
                decision_of_chco: values.Decision_of_CHCO,
                action_Taken_by_dtm: values.Action_Taken_by_DTM,
                action_taken_by_deb_pm: values.action_taken_by_DEB_PM,
                inserted_by:loggedInUser.user_id,
                status:"Processed",
                remark:values.remark,
            };

            axios({
                method: 'POST',
                url: 'http://10.57.40.130:8022/api/insertHR',
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

                <Header path="/humanCapital" />

                <form onSubmit={formik.handleSubmit}>

                    <div className={styles.alldiv} style={{ paddingBottom: '10px', width: '75%' }} >

                        <h2 className={styles.title}>Human Capital Cluster</h2>

                        <div className={styles.form1} style={{ width: '47%' }}>
                            <label> Fraud ID <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                            <input
                                name='fraudID'
                                id='fraudID'
                                onChange={formik.handleChange}
                                value={formik.values.fraudID}
                                placeholder='Fraud ID'
                                onBlur={formik.handleBlur}
                                className={formik.touched.fraudID && formik.errors.fraudID ? styles.inputError : null}
                            ></input>
                            {formik.touched.fraudID && formik.errors.fraudID ? <label className={styles.errors}>{formik.errors.fraudID}</label> : null}
                        </div>

                        <div className={styles.allform}>

                            <div className={styles.form1}>
                                <label> Action Taken by Chief Human Capital Officer <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <input
                                    name='Action_Taken_by_HCO'
                                    id='Action_Taken_by_HCO'
                                    onChange={formik.handleChange}
                                    value={formik.values.Action_Taken_by_HCO}
                                    placeholder='Please Enter Action Taken. . .'
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.Action_Taken_by_HCO && formik.errors.Action_Taken_by_HCO ? styles.inputError : null}
                                ></input>
                                {formik.touched.Action_Taken_by_HCO && formik.errors.Action_Taken_by_HCO ? <label className={styles.errors}>{formik.errors.Action_Taken_by_HCO}</label> : null}
                            </div>

                            <div className={styles.form1} >
                                <label style={{ textAlign: 'left' }}> Action Taken by Talent Management Director <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <input
                                    name='Action_Taken_by_TMD'
                                    id='Action_Taken_by_TMD'
                                    onChange={formik.handleChange}
                                    value={formik.values.Action_Taken_by_TMD}
                                    placeholder='Please Enter Action Taken. . .'
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.Action_Taken_by_TMD && formik.errors.Action_Taken_by_TMD ? styles.inputError : null}
                                >
                                </input>
                                {formik.touched.Action_Taken_by_TMD && formik.errors.Action_Taken_by_TMD ? <label className={styles.errors}>{formik.errors.Action_Taken_by_TMD}</label> : null}
                            </div>

                        </div>

                        <div className={styles.allform}>

                            <div className={styles.form1}>
                                <label>Action Taken by Displine Committee <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <div>
                                    <input
                                        type="text"
                                        name='Action_Taken_by_DC'
                                        id='Action_Taken_by_DC'
                                        onChange={formik.handleChange}
                                        value={formik.values.Action_Taken_by_DC}
                                        onBlur={formik.handleBlur}
                                        className={formik.touched.Action_Taken_by_DC && formik.errors.Action_Taken_by_DC ? styles.inputError : null}
                                        placeholder='Please Enter Action Taken. . .'>

                                        </input>
                                </div>
                                {formik.touched.Action_Taken_by_DC && formik.errors.Action_Taken_by_DC ? <label className={styles.errors}>{formik.errors.Action_Taken_by_DC}</label> : null}
                            </div>

                            <div className={styles.form1}>
                                <label>Decision of Chief Human Capital Officer <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <div>
                                    <input
                                        type="text"
                                        name='Decision_of_CHCO'
                                        id='Decision_of_CHCO'
                                        onChange={formik.handleChange}
                                        value={formik.values.Decision_of_CHCO}
                                        onBlur={formik.handleBlur}
                                        placeholder='Please Enter Decision Taken. . .'
                                        className={formik.touched.Decision_of_CHCO && formik.errors.Decision_of_CHCO ? styles.inputError : null}
                                    ></input>
                                    {formik.touched.Decision_of_CHCO && formik.errors.Decision_of_CHCO ? <label className={styles.errors}>{formik.errors.Decision_of_CHCO}</label> : null}
                                </div>
                            </div>
                        </div>

                        <div className={styles.allform}>

                            <div className={styles.form1}>
                                <label>Action Taken by Director Talent Management <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <div>
                                    <input
                                        type="text"
                                        name='Action_Taken_by_DTM'
                                        id='Action_Taken_by_DTM'
                                        onChange={formik.handleChange}
                                        value={formik.values.Action_Taken_by_DTM}
                                        onBlur={formik.handleBlur}
                                        className={formik.touched.Action_Taken_by_DTM && formik.errors.Action_Taken_by_DTM ? styles.inputError : null}
                                        placeholder='Please Enter Action Taken. . .'>

                                        </input>
                                </div>
                                {formik.touched.Action_Taken_by_DTM && formik.errors.Action_Taken_by_DTM ? <label className={styles.errors}>{formik.errors.Action_Taken_by_DTM}</label> : null}
                            </div>

                            <div className={styles.form1}>
                                <label style={{ textAlign: 'left', marginBottom: '3px' }}>Action taken by director, Employee Benefit and Performance Management</label>
                                <div>
                                    <input
                                        type="text"
                                        name='action_taken_by_DEB_PM'
                                        id='action_taken_by_DEB_PM'
                                        placeholder='Please Enter Action Taken. . .'
                                        onChange={formik.handleChange}
                                        value={formik.values.action_taken_by_DEB_PM}
                                        onBlur={formik.handleBlur}
                                        className={formik.touched.action_taken_by_DEB_PM && formik.errors.action_taken_by_DEB_PM ? styles.inputError : null}
                                    ></input>
                                    {formik.touched.action_taken_by_DEB_PM && formik.errors.action_taken_by_DEB_PM ? <label className={styles.errors}>{formik.errors.action_taken_by_DEB_PM}</label> : null}
                                </div>
                            </div>
                            <div className={styles.form1}>
                                <label style={{ textAlign: 'left', marginBottom: '3px' }}>Remark</label>
                                <div>
                                    <input
                                        type="text"
                                        name='remark'
                                        id='remark'
                                        placeholder='Please Enter Action Taken. . .'
                                        onChange={formik.handleChange}
                                        value={formik.values.remark}
                                        onBlur={formik.handleBlur}
                                        className={formik.touched.remark && formik.errors.remark ? styles.inputError : null}
                                    ></input>
                                    {formik.touched.remark && formik.errors.remark ? <label className={styles.errors}>{formik.errors.remark}</label> : null}
                                </div>
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
