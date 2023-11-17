import React from "react";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";
import styles from "../../../asset/style/report.module.css";
import Swal from "sweetalert2";

import { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

const apiConfig = {
  baseUrl: "http://10.57.40.130:8022/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function ActionTakenReportLegal() {
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const loggedInUser = JSON.parse(sessionStorage.getItem("user2"));
  const [formState, setFormState] = useState({
    hr: false,
    legal: false,
  });

  const loddata = async () => {
    try {
      const response = await axios.get("http://10.57.40.130:8022/api/fetchAllLegal");
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

 
 
  const columns = [
    {
      field: "fraud_id",
      headerName: "ID ",
      width: 60,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "status_of_pre_litigation",
      headerName: "Status of Pre-Litigation Action",
      width: 310,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      // valueFormatter: ({ value }) => (value ? "true" : "false"),
    },
    {
      field: "court_decision",
      headerName: "Court Decision",
      width: 310,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "amount_recovered",
      headerName: "Amount Recovered/Lost",
      width: 310,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    }
    
  ];

  return (
    <>
      <div>
        <Header path="/legalAction" />

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
              Status Of Legal Action
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
