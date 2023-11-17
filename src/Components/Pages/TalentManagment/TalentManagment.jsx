import React from "react";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
export default function TalentManagment() {
  const [dataSource, setDataSource] = useState([]);

  const navigate = useNavigate();

  const loddata = async () => {
    const response = await axios.get("http://10.57.40.130:8022/api/fetchfraudTdm");
    setDataSource(response.data);
  };
  useEffect(() => {
    loddata();
  }, []);






  const [popup, setPop] = useState(false);
  const [popup2, setPop2] = useState(false);



  const closePopup5 = () => {
    setPop(false);
    setPop2(false);
  };


  const renderUpdateButton = (params, fraudId, fraud_amount) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="success"
          size="medium"
          //style={{ marginLeft: 16 }}
          onClick={() => {
            navigate(`/Tdm_action_taken/${fraudId}/${fraud_amount}`);
          }}
        >
          Update
        </Button>
      </strong>
    );
  };


  const renderDeleteButton = (params, fraudId) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="error"
          size="medium"
          //style={{ marginLeft: 16 }}
          onClick={() => {
            navigate(`/taskStepstdm/${fraudId}`);
          }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </strong>
    );
  };


  const renderRollBackButton = (params, fraudId) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
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

  const renderReportButton = (params, fraudId, dscription) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          //style={{ marginLeft: 16 }}
          onClick={() => {
            navigate(`/tdmprocessingreporttd/${fraudId}`);
          }}
        >
          Report
        </Button>
      </strong>
    );
  };
  const columns = [
    {
      field: "fraud_id",
      headerName: "Fraud ID ",
      width: 100,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      // valueFormatter: ({ value }) => (value ? "true" : "false"),
    },
    {
      field: "fraud_type",
      headerName: "Fraud Type",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "fraud_method",
      headerName: "Fraud Method",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "areaof_fraud",
      headerName: "Area_where_the_Froud_Occurred",
      width: 200,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "location",
      headerName: "Location",
      width: 200,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "fraud_amount_type",
      headerName: "Fraud Amount Type",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "fraud_amount",
      headerName: "Fraud Amount",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "cause_of_fraud",
      headerName: "Cause of Fraud",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "date_of_detection",
      headerName: "Date OF Detection",
      width: 200,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "occerence_date",
      headerName: "Occerence Date",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "type_of_fraudster",
      headerName: "Type of Fraudster",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "fraudster_name",
      headerName: "Suspected Fraudster Name",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "fraudster_profession",
      headerName: "Suspected Fraudster Profession",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "technology_used_to_commit",
      headerName: "Technology used to commit the Fraud",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "action_taken",
      headerName: "Action Taken",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    // {
    //   field: "amount_recoverd",
    //   headerName: "Amount Recoverd",
    //   width: 150,
    //   headerClassName: "column-header",
    //   cellClassName: "column-cell",
    // },
    {
      field: "Update",
      width: 150,
      renderCell: (params) => renderUpdateButton(params, params.row.fraud_id, params.row.fraud_amount),
    },

    // {
    //   field: "Roll Back",
    //   width: 150,
    //   renderCell: (params) => renderRollBackButton(params, params.row.fraud_id),
    // },
    {
      field: "Delete Tasks",
      width: 150,
      renderCell: (params) => renderDeleteButton(params, params.row.fraud_id),
    },
    {
      field: "Report",
      width: 200,
      renderCell: (params) => renderReportButton(params, params.row.fraud_id, params.row.description),
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
        </>



        <Footer />
      </div>
    </>
  );
}
