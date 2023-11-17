import React from "react";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";


import { useState, useEffect } from "react";

import axios from "axios";


import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";

export default function BenfitActionTakenReport() {
  const [dataSource, setDataSource] = useState([]);

  const { id } = useParams();

  const data = {
    fraudId: id
  }

  const loddata = async () => {
    const response = await axios.post(`http://10.57.40.130:8022/api/fetchBenfitActionTakenByFraudId`, data);
    setDataSource(response.data);
    console.log(response.data);

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
    { field: 'bac_id', headerName: 'BAC ID', width: 120 },
    { field: 'fraud_id', headerName: 'Fraud ID', width: 150 },
    { field: 'desicsion_by_discpline_cm', headerName: 'Decision by Discipline CM', width: 200 },
    { field: 'deducting_amount', headerName: 'Deducting Amount', width: 150 },
    { field: 'amount_recovered', headerName: 'Amount Recovered', width: 150 },
    { field: 'employee_avaliblity', headerName: 'Employee Availability', width: 180 },
    { field: 'remark', headerName: 'Remark', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'inserted_at', headerName: 'Inserted At', width: 150 },
    { field: 'inserted_by', headerName: 'Inserted By', width: 150 },
    { field: 'source_payment', headerName: 'Source of Payment', width: 180 },
  ];

  return (
    <>
      <div>
        <Header path="/Benefit_tdm" />

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
              Fraud Report
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
