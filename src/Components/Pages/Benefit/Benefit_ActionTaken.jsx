import React from 'react'
import styles from "../../../asset/style/home.module.css"
import { useState, useEffect } from 'react';
import Footer from '../../../common/Footer';
import Header from '../../../common/Header';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaStarOfLife } from 'react-icons/fa';
import Swal from 'sweetalert2'
import 'animate.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import InputLabel from '@mui/material/InputLabel';

export default function Benefit_ActionTaken() {
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedSourcePayment, setSelectedSourcePaymentOption] = useState('');
    const [selectedStatusOption, setSelectedStatusOption] = useState('');
    const loggedInUser = JSON.parse(sessionStorage.getItem("user2"));
    const [selectedEmployeeType, setSelectedEmployeeTypeOption] = useState('');

    //console.log(loggedInUser.user_id);
    const { id } = useParams();
    const { fra_amount } = useParams();
    const [formState, setFormState] = useState({
        benfit: false,
        Close_fraud: false,
    });


    const handleChange_status = (event) => {
        setSelectedValue(event.target.value);
        console.log(selectedValue);

    };
    const handlechnagesource_payment = (event) => {
        const selectedValue = event.target.value;
        console.log(selectedValue);
        setSelectedSourcePaymentOption(selectedValue);
    };

    const handleChangeStatus = (event) => {
        const selectedValue = event.target.value;
        console.log(selectedValue);
        setSelectedStatusOption(selectedValue);

    };

    const handleUpdateAmount = async (amountRecovered) => {
        try {
            const response = await axios.put('http://10.57.40.130:8022/api/updateAmountRecovered', {
                fraud_id: id,
                amount_to_be_recovered: amountRecovered,
            });

            console.log(response.data); // Success message
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handle_employee_typeChange = (event) => {
        const selectedValue = event.target.value;
        console.log(selectedValue);
        setSelectedEmployeeTypeOption(selectedValue);
    };

    const initialValues = {
        fraudID: id,
        deductable_amout: fra_amount,
        amount_recovered: "",
        status_of: "",
        remark: "",
        employee_avalablity: "",
    }


    const formik = useFormik({
        initialValues: initialValues,

        validationSchema: Yup.object({
            fraudID: Yup.string()
                .max(100, "Must be 15 characters")
                .required('Fraud ID Required'),

            deductable_amout: Yup.number()
                //.min(1, 'Too Short!')
                //.max(10000, "Must be 15 characters")
                .required('This Field is Required'),

            amount_recovered: Yup.number()
                //.min(1, 'Too Short!')
                //.max(10000, "Must be 15 characters")
                .required('This Field is Required'),

            // employee_avalablity: Yup.string()
            //     .max(1000, "Must be 15 characters")
            //     .required('This Field is Required'),



            remark: Yup.string()
                .max(2000, "Must be 15 characters")
                .required('This Field is Required'),

        }),

        onSubmit: (values) => {

            const data = {
                fraud_id: values.fraudID,
                desicsion_by_discpline_cm: values.desicsion_by_discpline_cm,
                deducting_amount: values.deductable_amout,
                amount_recovered: values.amount_recovered,
                employee_avaliblity: selectedValue,
                remark: values.remark,
                status: selectedStatusOption,
                inserted_by: loggedInUser.user_id,
                source_payment: selectedSourcePayment,

            };

            if (values.fra_amount === 0) {

                axios({
                    method: 'POST',
                    url: 'http://10.57.40.130:8022/api/insert_benefit_action_taken',
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
                const amount_deducted = values.deductable_amout - values.amount_recovered;
                console.log(amount_deducted);

                if (values.deductable_amout === 0) {
                    handleUpdateAmount(0);
                } else {
                    handleUpdateAmount(amount_deducted);
                }
            } else {
                Swal.fire({
                    title: "All Amount is Recovered No Need To Update The Data",
                    icon: 'error',
                    showConfirmButton: true,
                    timer: 3000,
                })
            }
        },

    });

    return (
        <>
            <div>
                <Header path="/Benefit_tdm" />
                <div className={styles.home}>



                    <form onSubmit={formik.handleSubmit}>

                        <div className={styles.alldiv} style={{ paddingBottom: '10px', width: '75%' }} >

                            <h2 className={styles.title}>Benefit Action Taken</h2>

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
                                    <label>Deductble Amount<p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                    <input
                                        name='deductable_amout'
                                        id='deductable_amout'
                                        onChange={formik.handleChange}
                                        value={formik.values.deductable_amout}
                                        placeholder='Please Enter Amount. . .'
                                        onBlur={formik.handleBlur}
                                        className={formik.touched.deductable_amout && formik.errors.deductable_amout ? styles.inputError : null}
                                    ></input>
                                    {formik.touched.deductable_amout && formik.errors.deductable_amout ? <label className={styles.errors}>{formik.errors.deductable_amout}</label> : null}
                                </div>

                                <div className={styles.form1} >
                                    <label style={{ textAlign: 'left' }}>Amount Recovered<p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                    <input
                                        name='amount_recovered'
                                        id='amount_recovered'
                                        onChange={formik.handleChange}
                                        value={formik.values.amount_recovered}
                                        placeholder='Please Enter Amount. . .'
                                        onBlur={formik.handleBlur}
                                        className={formik.touched.amount_recovered && formik.errors.amount_recovered ? styles.inputError : null}
                                    >
                                    </input>
                                    {formik.touched.amount_recovered && formik.errors.amount_recovered ? <label className={styles.errors}>{formik.errors.amount_recovered}</label> : null}
                                </div>

                            </div>

                            <div className={styles.allform}>

                                <div className={styles.allform}>

                                    <div className={styles.form1} >
                                        <InputLabel id="employee_type">Employee Type<p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></InputLabel>
                                        <select onChange={handle_employee_typeChange}>
                                            <option value="" >Please select an option</option>
                                            <option value="Active_employee">Active Employee</option>
                                            <option value="Resigned_employee">Resigned Employee</option>
                                            <option value="Terminated_employee">Terminated Employee</option>

                                        </select>
                                        {formik.touched.employee_type && formik.errors.employee_type ? <label className={styles.errors}>{formik.errors.employee_type}</label> : null}
                                    </div>
                                </div>

                                <div className={styles.form1} >
                                    <InputLabel id="source_payment">Status<p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></InputLabel>
                                    <select onChange={handleChangeStatus}>
                                        <option value="" disabled>Please select an option</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Completed_closed">Completed/Closed</option>


                                    </select>
                                    {formik.touched.source_payment && formik.errors.source_payment ? <label className={styles.errors}>{formik.errors.source_payment}</label> : null}
                                </div>
                                {selectedEmployeeType !== 'Active_employee' && (
                                    <div className={styles.form1} >
                                        <InputLabel id="source_payment">Source Of Payment<p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></InputLabel>
                                        <select onChange={handlechnagesource_payment}>
                                            <option value="" disabled>Please select an option</option>
                                            <option value="serverance_payment">Serverance Payment</option>
                                            <option value="compenstation_payment">Compensation Payment</option>
                                            <option value="leave_payment">Leave Payment</option>
                                            <option value="cash_indeminity">Cash Indeminity</option>
                                            <option value="unpaid_salary">Unpaid Salary</option>
                                            <option value="completed">Other</option>
                                        </select>
                                        {formik.touched.source_payment && formik.errors.source_payment ? <label className={styles.errors}>{formik.errors.source_payment}</label> : null}
                                    </div>
                                )}
                            </div>

                            <div className={styles.allform}>


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
            </div>
        </>


    )
}
