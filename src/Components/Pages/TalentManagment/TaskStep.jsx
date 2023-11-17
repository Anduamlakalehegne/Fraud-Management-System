import { useState, useEffect } from 'react';
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
export default function TaskStep() {
    const loggedInUser = JSON.parse(sessionStorage.getItem("user2"));
    const { id } = useParams();
    const [dataSource, setDataSource] = useState([]);
    const navigate = useNavigate();
    const datas = {
        fraud_id: id
    }

    const loddata = async () => {
        const response = await axios.post('http://10.57.40.130:8022/api/fetch_proccessing_step', datas);
        setDataSource(response.data);
        console.log(response.data)
    };
    useEffect(() => {
        loddata();
    }, []);

    const renderDeleteButton = (params, pid) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="medium"
                    //style={{ marginLeft: 16 }}
                    onClick={() => {

                        axios.delete(`http://10.57.40.130:8022/api/processing_delete/${pid}`)
                            .then((response) => {
                                console.log(response.data);
                                Swal.fire({
                                    title: "Successfully Deleted",
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

                    }}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </strong>
        );
    };
    const columns = [
        {
            field: "pid",
            headerName: "Process ID ",
            width: 100,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "fraud_id",
            headerName: "Fraud ID ",
            width: 100,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "task_id",
            headerName: "Task Id",
            width: 100,
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
            field: "remark",
            headerName: "Remark",
            width: 300,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "Delete Tasks",
            width: 150,
            renderCell: (params) => renderDeleteButton(params, params.row.pid),
        },

    ];


    const formattedData = dataSource.map((item, index) => ({
        id: index + 1, // Assign a unique id to each row
        ...item,
        // statusmsg: item.res_json.statusmsg,
        // transactionID: item.res_json.transactionID,
    }));
    console.log("this is formated data ", formattedData);
    return (
        <>
            <div>
                <Header path="/TalentManagment" />

                <>

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
                            Task Report
                        </p>
                        <DataGrid
                            sx={{ m: 2 }}
                            checkboxSelection
                            rows={formattedData}
                            columns={columns}
                            components={{ Toolbar: GridToolbar }}
                        />
                    </div>
                </>



                <Footer />
            </div>
        </>
    )
}
