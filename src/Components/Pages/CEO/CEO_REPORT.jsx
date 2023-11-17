import React from "react";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";
import styles from "../../../asset/style/report.module.css";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
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

export default function CEO_REPORT() {
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const loggedInUser = JSON.parse(sessionStorage.getItem("user2"));
  const navigate = useNavigate();
  const location = useLocation();


  const [formState, setFormState] = useState({
    hr: false,
    legal: false,
  });
  const fetchNewFraudReports = () => {
    // Fetch new fraud reports using Axios or your preferred method
    axios.get('http://10.57.40.130:8022/api/fetchNewFrauds')
      .then(response => {
        // Process the response and update the fraudReports state
        setDataSource(response.data);
      })
      .catch(error => console.error(error));
  };

  const fetchAllFraudReports = () => {
    // Fetch all fraud reports using Axios or your preferred method
    axios.get('http://10.57.40.130:8022/api/fetchFrauds')
      .then(response => {
        // Process the response and update the fraudReports state
        setDataSource(response.data);

      })
      .catch(error => console.error(error));
  };

  const fetchAllClosedFraudReports = () => {
    // Fetch all fraud reports using Axios or your preferred method
    axios.get('http://10.57.40.130:8022/api/fetchClosedFrauds')
      .then(response => {
        // Process the response and update the fraudReports state
        setDataSource(response.data);

      })
      .catch(error => console.error(error));
  };

  const { state } = useLocation();
  const source = state && state.source;
  //console.log(source);

  useEffect(() => {

    if (source === 'New') {
      fetchNewFraudReports();
    } else if (source === 'Closed') {
      fetchAllClosedFraudReports();
      //fetchNewFraudReports();
    } else {

      fetchAllFraudReports();

    }
  }, []);



  const [popup2, setPop2] = useState(false);

  const handleClickopen = (fraudId) => {
    setPop2(!popup2);
    setSelectedId(fraudId);
  };

  const closePopup5 = () => {
    setPop2(false);
  };

  const selectById = async (id) => {
    try {
      const response = await axios.get(
        `http://10.57.40.130:8022/api/fetchFraud/${id}`
      );
      setDataSource2(response.data);
    } catch (error) {
      console.error(error);
      // Handle the error, such as displaying an error message or retrying the request
    }
  };

  useEffect(() => {
    if (selectedId) {
      selectById(selectedId);
    }
  }, [selectedId]);

  const formattedData = dataSource.map((item, index) => ({
    id: index + 1,
    // Assign a unique id to each row
    ...item,
    // statusmsg: item.res_json.statusmsg,
    // transactionID: item.res_json.transactionID,
  }));

  const formik = useFormik({
    initialValues: {
      remark: "",
      dcd: "",
      hr: false,
      legal: false,
      ID: dataSource2.fraud_id,
    },
    onSubmit: async (values) => {
      try {
        if (values.hr && values.legal) {
          const [hrResponse, legalResponse] = await Promise.all([
            axios.post(`${apiConfig.baseUrl}/assignFruad`, getHRData(values), {
              headers: apiConfig.headers,
            }),
            axios.post(
              `${apiConfig.baseUrl}/assignFruad`,
              getLegalData(values),
              {
                headers: apiConfig.headers,
              }
            ),
          ]);

          console.log(hrResponse.data);
          console.log(legalResponse.data);

          Swal.fire({
            title: "Send Successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          closePopup5();
        } else if (values.hr) {
          const hrResponse = await axios.post(
            `${apiConfig.baseUrl}/assignFruad`,
            getHRData(values),
            {
              headers: apiConfig.headers,
            }
          );

          console.log(hrResponse.data);

          Swal.fire({
            title: "Send Successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          closePopup5();
        } else if (values.legal) {
          const legalResponse = await axios.post(
            `${apiConfig.baseUrl}/assignFruad`,
            getLegalData(values),
            {
              headers: apiConfig.headers,
            }
          );

          console.log(legalResponse.data);

          Swal.fire({
            title: "Send Successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          closePopup5();
        } else {
          Swal.fire({
            title: "Please select one assignation",
            icon: "error",
            showConfirmButton: true,
            timer: 3000,
          });
        }
      } catch (error) {
        console.error(error);

        Swal.fire({
          title: "Error",
          text: "An error occurred while submitting the form. Please try again later.",
          icon: "error",
          showConfirmButton: true,
          timer: 3000,
        });
      }
    },
  });

  const getHRData = (values) => {
    return {
      fraud_id: dataSource2.fraud_id.toString(),
      assigned_by: loggedInUser.user_id.toString(),
      assigned_to: "4",
      remark: values.remark,
      action_taken_by_dc: values.dcd,
    };
  };

  const getLegalData = (values) => {
    return {
      fraud_id: dataSource2.fraud_id.toString(),
      assigned_by: loggedInUser.user_id.toString(),
      assigned_to: "5",
      remark: values.remark,
      action_taken_by_dc: values.dcd,
    };
  };


  const handleChange = (event) => {
    const { name, checked } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: checked }));
    formik.setFieldValue(name, checked)
  };
  const renderUpdateButton = (params, fraudId, dscription) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 10 }}
          onClick={() => {
            navigate(`/assigndep/${fraudId}/${dscription}`);
          }}
        >
          Assign
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
            navigate(`/tdmprocessingreportceo/${fraudId}`);
          }}
        >
          HR Report
        </Button>
      </strong>
    );
  };
  // const handleRemarkChange = (event) => {
  const renderLegalButton = (params, fraudId, dscription) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          //style={{ marginLeft: 16 }}
          onClick={() => {
            navigate(`/legalreport/${fraudId}`);
          }}
        >
          Legal Report
        </Button>
      </strong>
    );
  };
  // const handleRemarkChange = (event) => {
  //   formik.setFieldValue("remark", event.target.value);
  // };

  // const handleDcdChange = (event) => {
  //   formik.setFieldValue("dcd", event.target.value);
  // };
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
    {
      field: "",
      renderCell: (params) => {
        if (source === 'New') {
          return renderUpdateButton(params, params.row.fraud_id, params.row.description);
        } else if (source === 'Closed') {
          return null;
        } else {
          return renderUpdateButton(params, params.row.fraud_id, params.row.description);
        }
      },
    },
    {
      field: "HR Report",
      width: 200,
      renderCell: (params) => renderReportButton(params, params.row.fraud_id, params.row.description),
    }, {
      field: "Legal Report",
      width: 200,
      renderCell: (params) => renderLegalButton(params, params.row.fraud_id, params.row.description),
    },
  ];

  return (
    <>
      <div>
        <Header path="/CEO" />

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
