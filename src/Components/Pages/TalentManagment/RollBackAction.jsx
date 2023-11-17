import { useState, useEffect } from 'react'
import styles from "../../../asset/style/home.module.css"
import Footer from '../../../common/Footer';
import Header from '../../../common/Header';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import 'animate.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function RollBackAction() {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState({ task_id: '', task: '' });
    const loggedInUser = JSON.parse(sessionStorage.getItem("user2"));
    const { id } = useParams();

    const [dataSource, setDataSource] = useState([]);

    const navigate = useNavigate();
    const datas = {
        fraud_id: id
    }

    const loddata = async () => {
        const response = await axios.post('http://10.57.40.130:8022/api/fetch_save_point', datas);
        setDataSource(response.data);
    };
    useEffect(() => {
        loddata();
    }, []);


    console.log(selectedOption);
    useEffect(() => {
        axios.get(`http://10.57.40.130:8022/api/tasks/${id}`)
            .then(response => {
                setOptions(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const handleChange = (event) => {
        const selectedValue = event.target.value;
        const [task_id, task] = selectedValue.split(',');
        setSelectedOption({ task_id, task });

    };



    function generateSavepointName(fraudId, taskId) {
        const currentDate = new Date().toISOString().slice(0, 10);
        return `${"WB_Fraud"}_${fraudId}_${taskId}_${currentDate}`;
    }

    // const formik = useFormik({
    //     initialValues: initialValues,

    //     validationSchema: Yup.object({
    //         fraudID: Yup.string()
    //             .max(100, "Must be 15 characters")
    //             .required('Fraud ID Required')

    //     }),

    //     onSubmit: (values) => {

    //         const save_point = generateSavepointName(values.fraudID, selectedOption.task_id);
    //         console.log(save_point);

    //         const data = {
    //             task_id: selectedOption.task_id,
    //             fraud_id: values.fraudID,
    //             remark: values.remark,
    //             inserted_by: loggedInUser.user_id,
    //             task: selectedOption.task,
    //             savepoint_name: save_point
    //         };


    //         const save_point_data = {
    //             task_id: selectedOption.task_id,
    //             fraud_id: values.fraudID,
    //             savepoint_name: save_point
    //         }



    //         // this is for sending a post request to insert a task  also for a rollback action
    //         axios({
    //             method: 'POST',
    //             url: 'http://10.57.40.130:8022/api/insertTaskStep',
    //             data
    //         })
    //             .then(function (res) {
    //                 Swal.fire({
    //                     title: "Send Successfully",
    //                     icon: 'success',
    //                     showConfirmButton: false,
    //                     timer: 2000,
    //                 });
    //             })
    //             .catch(function (res) {
    //                 console.log(res);
    //             });


    //         // this is  fro sending a post request for saving a savepoint for a rollback action 
    //         axios.post('http://10.57.40.130:8022/api/savepoint', save_point_data)
    //             .then((response) => {
    //                 console.log(response.data);
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     },

    // });



    const renderRollBackButton = (params, fraudId) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="medium"
                    //style={{ marginLeft: 16 }}
                    onClick={() => {
                        navigate(`/rollbackaction/${fraudId}`);
                    }}
                >
                    Roll Back
                </Button>
            </strong>
        );
    };

    const columns = [
        {
            field: "fraud_id",
            headerName: "Fraud ID ",
            width: 300,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "savepoint_name",
            headerName: "Save Point Name",
            width: 300,
            headerClassName: "column-header",
            cellClassName: "column-cell",
            // valueFormatter: ({ value }) => (value ? "true" : "false"),
        },
        {
            field: "task",
            headerName: "Task",
            width: 300,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "Roll Back",
            width: 150,
            renderCell: (params) => renderRollBackButton(params, params.row.savepoint_name),
        },
    ];


    const formattedData = dataSource.map((item, index) => ({
        id: index + 1, // Assign a unique id to each row
        ...item,
        // statusmsg: item.res_json.statusmsg,
        // transactionID: item.res_json.transactionID,
    }));

    return (
        <>
            <div className={styles.home}>

                <Header path="/TalentManagment" />

                <div
                    style={{
                        height: "75vh",
                        width: "95%",
                        margin: "auto",
                        marginTop: "40px",
                        marginBottom: "120px",
                    }}
                >
                    <p
                        style={{ fontSize: "30px", fontWeight: "550", color: "#ff6b0b" }}
                    >
                        Fraud Report
                    </p>
                    <DataGrid
                        sx={{ m: 2 }}
                        checkboxSelection
                        rows={formattedData}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                    />
                </div>
            </div>

            <Footer />

        </>
    )
}
