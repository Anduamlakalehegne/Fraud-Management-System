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





export default function ActionTaken() {
    const loggedInUser = JSON.parse(sessionStorage.getItem("user2"));

    const {id} = useParams();
    console.log(id);

    const initialValues = {
        fraudID: id,
        internalAudit: "",
        internalControl: "",
        Improvment_on_Procedure: "",
        Improvment_on_System: "",
        amountRecoverd:"",

    }
    const formik = useFormik({
        initialValues: initialValues,

        validationSchema: Yup.object({

            fraudID: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('Fraud Id Required'),

            internalAudit: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('Internal Audit Required'),

            internalControl: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('Improvment on Internal Control Required'),

            Improvment_on_Procedure: Yup.string()
                .max(1000, "Must be 15 characters")
                .required('Improvment on Procedure Required'),

            Improvment_on_System: Yup.string()
                .max(1000, "Must be 15 characters")
                .required(' Improvment on System Required'),

        }),

        onSubmit: (values) => {

            const data = {
                fraud_id: values.fraudID,
                imp_on_intrnal_control: values.internalControl,
                status:"Pending",
                imp_on_procedure: values.Improvment_on_Procedure,
                imp_on_system: values.Improvment_on_System,
                inserted_by: loggedInUser.user_id,
                amount_recovered: values.amountRecoverd,
                internal_Audit: values.internalAudit,
                
            };

            axios({
                method: 'POST',
                url: 'http://10.57.40.130:8022/api/insertAuditAction',
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
                <Header path="/home" />

                <form onSubmit={formik.handleSubmit}>

                    <div className={styles.alldiv} style={{ paddingBottom: '10px' }}>

                        <h2 className={styles.title}>Action Taken </h2>

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
                                <label>Amount Recoverd <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <div>
                                    <select
                                        name='amountRecoverd'
                                        id='amountRecoverd'
                                        onChange={formik.handleChange}
                                        value={formik.values.amountRecoverd}
                                        onBlur={formik.handleBlur}
                                        className={formik.touched.amountRecoverd && formik.errors.amountRecoverd ? styles.inputError : null}>
                                        <option value="">--- Select Amount Recoverd ---</option>
                                        <option value="Fully">Fully</option>
                                        <option value="Partially">Partially</option>
                                        <option value="Not at All">Not at All</option>
                                    </select>
                                    {formik.touched.amountRecoverd && formik.errors.amountRecoverd ? <label className={styles.errors}>{formik.errors.amountRecoverd}</label> : null}
                                </div>
                            </div>
                        </div>


                        <div className={styles.allform}>
                            <div className={styles.form1}>
                                <label> Internal Audit <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <input
                                    name='internalAudit'
                                    id='internalAudit'
                                    onChange={formik.handleChange}
                                    value={formik.values.internalAudit}
                                    placeholder='Internal Audit'
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.internalAudit && formik.errors.internalAudit ? styles.inputError : null}
                                ></input>
                                {formik.touched.internalAudit && formik.errors.internalAudit ? <label className={styles.errors}>{formik.errors.internalAudit}</label> : null}
                            </div>
                            <div className={styles.form1}>
                                <label>Improvment on Internal Control <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <input
                                    name='internalControl'
                                    id='internalControl'
                                    onChange={formik.handleChange}
                                    value={formik.values.internalControl}
                                    placeholder='Improvment on Internal Control'
                                    onBlur={formik.handleBlur}
                                    className={formik.touched.internalControl && formik.errors.internalControl ? styles.inputError : null}
                                >
                                </input>
                                {formik.touched.internalControl && formik.errors.internalControl ? <label className={styles.errors}>{formik.errors.internalControl}</label> : null}
                            </div>
                        </div>

                        
                        
                        <div className={styles.allform}>

                            <div className={styles.form1}>
                                <label>Improvment on Procedure <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <div>
                                    <input
                                        type="text"
                                        name='Improvment_on_Procedure'
                                        id='Improvment_on_Procedure'
                                        onChange={formik.handleChange}
                                        value={formik.values.Improvment_on_Procedure}
                                        onBlur={formik.handleBlur}
                                        className={formik.touched.Improvment_on_Procedure && formik.errors.Improvment_on_Procedure ? styles.inputError : null}
                                        placeholder='Improvment on Procedure'></input>
                                </div>
                                {formik.touched.Improvment_on_Procedure && formik.errors.Improvment_on_Procedure ? <label className={styles.errors}>{formik.errors.Improvment_on_Procedure}</label> : null}
                            </div>

                            <div className={styles.form1}>
                                <label>Improvment on System <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                <div>
                                    <input
                                        type="text"
                                        name='Improvment_on_System'
                                        id='Improvment_on_System'
                                        onChange={formik.handleChange}
                                        value={formik.values.Improvment_on_System}
                                        onBlur={formik.handleBlur}
                                        placeholder='Improvment on System'
                                        className={formik.touched.Improvment_on_System && formik.errors.Improvment_on_System ? styles.inputError : null}
                                    ></input>
                                    {formik.touched.Improvment_on_System && formik.errors.Improvment_on_System ? <label className={styles.errors}>{formik.errors.Improvment_on_System}</label> : null}
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
