import React from "react";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";


import { useState, useEffect } from "react";

import axios from "axios";


import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function ActionTakenReport() {
  const [dataSource, setDataSource] = useState([]);

  const loddata = async () => {
    const response = await axios.get("http://10.57.40.130:8022/api/fetchAllAuditAction");
    setDataSource(response.data);

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
      headerName: "Fraud ID ",
      width: 100,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "imp_on_intrnal_control",
      headerName: "Improvement On Internal Control",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      // valueFormatter: ({ value }) => (value ? "true" : "false"),
    },
    {
      field: "imp_on_procedure",
      headerName: "Improvement On Procedure",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "imp_on_system",
      headerName: "Improvement On System",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "amount_recovered",
      headerName: "Amount recovered",
      width: 200,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "internalaudit",
      headerName: "Internal Audit",
      width: 200,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    }
  ];

  return (
    <>
      <div>
        <Header path="/report" />

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
