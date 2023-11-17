import { useState, useEffect } from 'react'
import styles from "../../../asset/style/home.module.css"
import Footer from '../../../common/Footer';
import Header from '../../../common/Header';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaStarOfLife } from 'react-icons/fa';
import Swal from 'sweetalert2'
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import 'animate.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

export default function TDM_ActionTaken() {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState({ task_id: '', task: '' });
    const [selectedCleranceOption, setSelectedCleranceOption] = useState('');
    const [ApprovalStatus, setApprovalStatus] = useState();
    const [selectedValue, setSelectedValue] = useState('');
    const loggedInUser = JSON.parse(sessionStorage.getItem("user2"));
    const [selectedEmployeeType, setSelectedEmployeeTypeOption] = useState('');
    const [showTextBox, setShowTextBox] = useState(false);
    //console.log(loggedInUser.user_id);
    const { id } = useParams();
    const { fra_amount } = useParams();

    const [formState, setFormState] = useState({
        benfit: false,
        Close_fraud: false,
    });

    const initialValues = {
        fraudID: id,
        remark: "",
        remark_close: "",
        amount_to_be_recovered: fra_amount,
    }
    const fraudID_data = {
        "fraud_id": id,
    }

    const loddata = async () => {
        const response = await axios.get(`http://10.57.40.130:8022/api/tasks/${id}`)
            .then(response => {
                setOptions(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    };
    console.log(selectedOption);
    useEffect(() => {
        loddata();


        axios.post(`http://10.57.40.130:8022/api/minute_aproval_status`, fraudID_data)
            .then(response => {
                setApprovalStatus(response.data[0].minute_approval_status);
                console.log(response.data[0].minute_approval_status);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);



    const handle_employee_typeChange = (event) => {
        const selectedValue = event.target.value;
        console.log(selectedValue);
        setSelectedEmployeeTypeOption(selectedValue);
    };

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        console.log(selectedValue);
        const [task_id, task] = selectedValue.split(',');
        setSelectedOption({ task_id, task });

    };
    const handleChangeclerance = (event) => {
        const selectedValue = event.target.value;
        console.log(selectedValue);

        setSelectedCleranceOption(selectedValue);

    };

    const handleChange_status = (event) => {
        setSelectedValue(event.target.value);
        // if (event.target.value === 'closed') {
        //     setShowTextBox(true);
        // } else {
        //     setShowTextBox(false);
        // }
        setShowTextBox(event.target.value === 'assigned_to_benfit' || event.target.value === 'closed');
    };


    const handleClick = () => {
        // Access the selected value from the radio group
        console.log("Selected value:", selectedValue);

        const data = {
            fraud_id: id.toString(),
            assigned_by: loggedInUser.user_id.toString(),
            assigned_to: "7",
            remark: document.getElementById('remark_close').value,
            action_taken_by_dc: "refre the fraud detail",
            amount_to_be_recovered: fra_amount,
            employee_type: selectedEmployeeType,

        };

        const datas = {
            fraud_id: id.toString(),
            remark: document.getElementById('remark_close').value,
            status: "Closed",
            inserted_by: loggedInUser.user_id.toString(),
        };


        if (selectedValue === "closed") {

            axios.post(`http://10.57.40.130:8022/api/insert_tdm_closed_fraud`, datas)
                .then((response) => {
                    console.log(response.data);
                    Swal.fire({
                        title: "Successfully inserted the data",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                    });

                    loddata();
                })
                .catch((error) => {
                    console.log(error);
                    // handle error
                });



        } else if (selectedValue === "assigned_to_benfit") {

            axios.post(`http://10.57.40.130:8022/api/assignTdm_to_benfit_Fruad`, data)
                .then((response) => {
                    console.log(response.data);
                    Swal.fire({
                        title: "Successfully inserted the data",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                    });

                    loddata();
                })
                .catch((error) => {
                    console.log(error);
                    // handle error
                });

        }
    };





    // function generateSavepointName(fraudId, taskId) {
    //     const currentDate = new Date().toISOString().slice(0, 10);
    //     return `${"WB_Fraud"}_${fraudId}_${taskId}_${currentDate}`;
    // }

    function generateSavepointName(fraudId, taskId) {
        const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '_');
        const uniqueId = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
        return `WB_Fraud_${fraudId}_${taskId}_${currentDate}_${uniqueId}`;
    }


    const formik = useFormik({
        initialValues: initialValues,

        validationSchema: Yup.object({
            fraudID: Yup.string()
                .max(100, "Must be 15 characters")
                .required('Fraud ID Required'),

            clerance_status: Yup.string()
            // .required('This Filed is Required')

        }),

        onSubmit: (values) => {

            const save_point = generateSavepointName(values.fraudID, selectedOption.task_id);
            console.log(save_point);

            const data = {
                task_id: selectedOption.task_id,
                fraud_id: values.fraudID,
                remark: values.remark,
                inserted_by: loggedInUser.user_id,
                task: selectedOption.task,
                savepoint_name: save_point,
                Clerance_Status: selectedCleranceOption,
            };


            // const save_point_data = {
            //     task_id: selectedOption.task_id,
            //     fraud_id: values.fraudID,
            //     savepoint_name: save_point
            // }



            // this is for sending a post request to insert a task  also for a rollback action
            axios({
                method: 'POST',
                url: 'http://10.57.40.130:8022/api/insertTaskStep',
                data
            })
                .then(function (res) {
                    Swal.fire({
                        title: "Send Successfully",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                })
                .catch(function (res) {
                    console.log(res);
                });

            loddata();


            // this is  fro sending a post request for saving a savepoint for a rollback action 
            // axios.post('http://10.57.40.130:8022/api/savepoint', save_point_data)
            //     .then((response) => {
            //         console.log(response.data);
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //     });
        },


    });



    return (
        <>
            <div className={styles.home}>

                <Header path="/TalentManagment" />

                <form onSubmit={formik.handleSubmit}>

                    <div className={styles.alldiv} style={{ paddingBottom: '10px', width: '75%' }} >

                        <h2 className={styles.title}>Task Processing</h2>

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
                                <label style={{ textAlign: 'left', marginBottom: '3px' }}>Amount To Recover</label>
                                <div>
                                    <input
                                        type="text"
                                        name='amount_to_be_recovered'
                                        id='amount_to_be_recovered'
                                        placeholder='Please Enter Amount. . .'
                                        onChange={formik.handleChange}
                                        value={formik.values.amount_to_be_recovered}
                                        onBlur={formik.handleBlur}
                                        className={formik.touched.amount_to_be_recovered && formik.errors.amount_to_be_recovered ? styles.inputError : null}
                                    ></input>
                                    {formik.touched.amount_to_be_recovered && formik.errors.amount_to_be_recovered ? <label className={styles.errors}>{formik.errors.amount_to_be_recovered}</label> : null}
                                </div>
                            </div>
                        </div>

                        <div className={styles.allform}>

                            <div className={styles.form1} >
                                <InputLabel id="employee_type">Employee Type<p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></InputLabel>
                                <select onChange={handle_employee_typeChange}>
                                    <option value="" disabled>Please select an option</option>
                                    <option value="Active_employee">Active Employee</option>
                                    <option value="Resigned_employee">Resigned Employee</option>
                                    <option value="Terminated_employee">Terminated Employee</option>

                                </select>
                                {formik.touched.employee_type && formik.errors.employee_type ? <label className={styles.errors}>{formik.errors.employee_type}</label> : null}
                            </div>
                        </div>

                        <div className={styles.allform} style={{ width: '50%' }}>
                            <div className={styles.form2} >
                                <Accordion defaultExpanded="true">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Minute Approval Status</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="h6" style={{ color: 'green', fontFamily: 'Arial', fontWeight: 'bold' }}>
                                            {ApprovalStatus}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                        <hr />
                        <div className={styles.allform} style={{ width: '50%' }}>
                            <div className={styles.form2} >
                                <Accordion defaultExpanded="true">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Update Status</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <RadioGroup
                                            value={selectedValue}
                                            onChange={handleChange_status}
                                        >
                                            <FormControlLabel control={<Radio value="assigned_to_benfit" selectedOption={formState.benfit} id="benfit"
                                                onBlur={handleChange_status}
                                                onChange={handleChange_status} />} label="Assign To Benfit" />
                                            <FormControlLabel control={<Radio value="closed" id="Close_fraud"
                                                selectedOption={formState.Close_fraud}
                                                onBlur={handleChange_status}
                                                onChange={handleChange_status}
                                            />} label="Close Fraud" />
                                        </RadioGroup>

                                        {showTextBox && (
                                            <div className={styles.form1}>
                                                <label style={{ textAlign: 'left', marginBottom: '3px' }}>Remark</label>
                                                <div>
                                                    <input
                                                        type="textarea"
                                                        name='remark_close'
                                                        id='remark_close'
                                                        placeholder='Please Enter remark. . .'
                                                        onChange={formik.handleChange}
                                                        value={formik.values.remark_close}
                                                        onBlur={formik.handleBlur}
                                                        className={formik.touched.remark_close && formik.errors.remark_close ? styles.inputError : null}
                                                    ></input>
                                                    {formik.touched.remark_close && formik.errors.remark_close ? <label className={styles.errors}>{formik.errors.remark_close}</label> : null}
                                                </div>
                                            </div>
                                        )}
                                        <hr />
                                        <Button onClick={handleClick} type="submit" variant="contained" className={styles.button}>Submit</Button>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>

                        <div className={styles.allform}>
                            <div className={styles.form1} >
                                <InputLabel id="action_taken_tdm">Select Task</InputLabel>
                                <select onChange={handleChange}>
                                    <option value="" disabled>Please select an option</option>
                                    {options.map(option => (
                                        <option key={option.task_id} value={`${option.task_id},${option.task}`}>{option.task}</option>
                                    ))}
                                </select>
                                {formik.touched.action_taken_tdm && formik.errors.action_taken_tdm ? <label className={styles.errors}>{formik.errors.action_taken_tdm}</label> : null}
                            </div>
                            {selectedEmployeeType !== 'Active_employee' && (
                                <div className={styles.allform}>
                                    <div className={styles.form1} >
                                        <InputLabel id="clerance_status">Clerance Status<p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></InputLabel>
                                        <select onChange={handleChangeclerance}>
                                            <option value="" disabled>Please select an option</option>
                                            <option value="not_started">Not Started</option>
                                            <option value="on_process">On Process</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                        {formik.touched.clerance_status && formik.errors.clerance_status ? <label className={styles.errors}>{formik.errors.clerance_status}</label> : null}
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className={styles.allform}>


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
                            <hr />
                            <Button type="submit" variant="contained" className={styles.button}>Submit</Button>
                            {/* onClick={() => { addProjects()}}  */}
                        </div>
                    </div>
                </form>
            </div>

            <Footer />

        </>
    )
}
