import React from "react";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";
import styles from "../../../asset/style/report.module.css";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { green, yellow } from "@mui/material/colors";


const apiConfig = {
  baseUrl: "http://10.57.40.130:8022/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function ActionTakenReportHr() {
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const loggedInUser = JSON.parse(sessionStorage.getItem("user2"));
  const [formState, setFormState] = useState({
    hr: false,
    legal: false,
  });



  const { id } = useParams();
  const fetch_data = {
    task_id: "5",
    fraud_id: id,
  }
  const loddata = async () => {
    try {
      const response = await axios.post("http://10.57.40.130:8022/api/tdm_processing_step", fetch_data);
      setDataSource(response.data);
    } catch (error) {
      console.error(error);
      // Handle the error, such as displaying an error message or retrying the request
    }
  };

  useEffect(() => {
    loddata();
  }, []);




  const formattedData = dataSource.map((item, index) => ({
    id: index + 1,
    // Assign a unique id to each row
    ...item,
    // statusmsg: item.res_json.statusmsg,
    // transactionID: item.res_json.transactionID,
  }));

  const renderApproveButton = (params, fraud_id, pid) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="success"
          size="medium"
          //style={{ marginLeft: 16 }}
          onClick={() => {

            axios.put(`http://10.57.40.130:8022/api/tdm_processing_steps/${fraud_id}/${pid}`)
              .then((response) => {
                console.log(response.data);
                Swal.fire({
                  title: "Successfully updated",
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
          Approve Minute
        </Button>
      </strong>
    );
  };





  const columns = [

    {
      field: "pid",
      headerName: "Processing Id",
      width: 100,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      // valueFormatter: ({ value }) => (value ? "true" : "false"),
    },
    {
      field: "fraud_id",
      headerName: "Fraud ID ",
      width: 100,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "task",
      headerName: "Task",
      width: 320,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "remark",
      headerName: "Remark",
      width: 320,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "inserted_at",
      headerName: "Task Happend At",
      width: 200,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      backgroundColor: green[600],
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "Approve Minute",
      width: 200,
      renderCell: (params) => renderApproveButton(params, params.row.fraud_id, params.row.pid),
    },



  ];

  return (
    <>
      <div>
        <Header path="/humanCapital" />

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
              Minute Approval
            </p>
            <DataGrid
              sx={{ m: 2 }}
              checkboxSelection
              rows={formattedData}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              getRowId={(row) => row.id}


            />
          </div>
        </>



        <Footer />
      </div>
    </>
  );
}
