import React from "react";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";
import styles from "../../../asset/style/report.module.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import { useState, useEffect } from "react";

import axios from "axios";
import { FaStarOfLife } from "react-icons/fa";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function Report() {
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPage] = useState(1);
  const [selection, setSelection] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
 
  const navigate = useNavigate();

  const loddata = async () => {
    const response = await axios.get("http://10.57.40.130:8022/api/fetchFrauds");
    setDataSource(response.data);
    setTotalPage(response.data.length);
  };
  useEffect(() => {
    loddata();
  }, []);

  const [page, setCurentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(5);
  const indexOfLastPage = page * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPage = dataSource.slice(indexOfFirstPage, indexOfLastPage);

  const onShowSizeChange = (current, pageSize) => {
    setpostPerPage(pageSize);
  };

  const [popup, setPop] = useState(false);
  const [popup2, setPop2] = useState(false);

  const handleClickopen = (fraudId) => {
    setPop2(!popup2);
    selectById(fraudId);

    // updateData(fraudId);
  };
  // const handleClickopen1 = () => {
  //   setPop2(!popup);
  // };
  const closePopup5 = () => {
    setPop(false);
    setPop2(false);
  };

  const selectById = async (id) => {
    const response = await axios.get(
      `http://10.57.40.130:8022/api/fetchFraud/${id}`
    );
    //console.log("this is ", id);
    setDataSource2(response.data);
    setSelection(id);
    //console.log("this is data source 2", id);
  };
  useEffect(() => {
    selectById();
  }, []);

  // const updateData = async (id) => {
  //   const response = await axios.put(
  //     `http://10.57.40.130:8022/api/updateFraud/${selection.fraud_id}`
  //   );
  //   setDataSource2(response.data);
  // };
  // useEffect(() => {
  //   updateData();
  // }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataSource2((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formattedData = dataSource.map((item, index) => ({
    id: index + 1,
    // Assign a unique id to each row
    ...item,
    // statusmsg: item.res_json.statusmsg,
    // transactionID: item.res_json.transactionID,
  }));
  const onSubmit = (event) => {
    // ...
    handleUpdate(event); // Make sure to pass the event argument here
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const updatedData = Object.fromEntries(formData.entries());
      console.log(updatedData);

      await axios
        .put(`http://10.57.40.130:8022/api/updateFraud/${selection}`, updatedData)

        .then(function (res) {
          Swal.fire({
            title: "Successfully updated",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch(function (res) {
          console.log(res);
        });

      closePopup5();
    } catch (error) {
      console.log(error);
    }
  };

  const renderDetailsButton = (params, fraudId) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            navigate(`/actionTaken/${fraudId}`);
          }}
        >
          More Info
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
            navigate(`/tdmprocessingreportAudit/${fraudId}`);
          }}
        >
          Report
        </Button>
      </strong>
    );
  };

  const renderUpdateButton = (params, fraudId) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            handleClickopen(fraudId);
          }}
        >
          View Info
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
      disableColumnMenu: false,
      // valueFormatter: ({ value }) => (value ? "true" : "false"),
    },
    {
      field: "fraud_type",
      headerName: "Fraud Type",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      disableColumnMenu: false,
    },
    {
      field: "fraud_method",
      headerName: "Fraud Method",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      disableColumnMenu: false,
    },
    {
      field: "areaof_fraud",
      headerName: "Area_where_the_Froud_Occurred",
      width: 200,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      disableColumnMenu: false,
    },
    {
      field: "location",
      headerName: "Location",
      width: 200,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      disableColumnMenu: true,
    },
    {
      field: "fraud_amount_type",
      headerName: "Fraud Amount Type",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      disableColumnMenu:true,
    },
    {
      field: "fraud_amount",
      headerName: "Fraud Amount",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      disableColumnMenu:true,
    },
    {
      field: "cause_of_fraud",
      headerName: "Cause of Fraud",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      disableColumnMenu:true,
    },
    {
      field: "date_of_detection",
      headerName: "Date OF Detection",
      width: 200,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      disableColumnMenu:true,
    },
    {
      field: "occerence_date",
      headerName: "Occerence Date",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      disableColumnMenu:true,
    },
    {
      field: "type_of_fraudster",
      headerName: "Type of Fraudster",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      disableColumnMenu:true,
    },
    {
      field: "fraudster_name",
      headerName: "Suspected Fraudster Name",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      disableColumnMenu:true,
    },
    {
      field: "fraudster_profession",
      headerName: "Suspected Fraudster Profession",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      disableColumnMenu:true,
    },
    {
      field: "technology_used_to_commit",
      headerName: "Technology used to commit the Fraud",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      disableColumnMenu:true,
    },
    {
      field: "action_taken",
      headerName: "Action Taken",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      disableColumnMenu:true,
    },
    // {
    //   field: "Print",
    //   width: 200,
    //   renderCell: (params) => renderDetailsButton(params, params.row.fraud_id),
    //   disableColumnMenu:false,
    // },
    {
      field: "View Info",
      width: 200,
      renderCell: (params) => renderUpdateButton(params, params.row.fraud_id),
      disableColumnMenu:false,
    },
    {
      field: "Report",
      width: 200,
      renderCell: (params) => renderReportButton(params, params.row.fraud_id, params.row.description),
      disableColumnMenu:false,
    },
  ];

  // const [visibleColumns, setVisibleColumns] = React.useState(['fraud_id','description','fraud_type','fraud_method','areaof_fraud','Print','Update','Report'])
  // const handleColumnVisibilityChange = React.useCallback((newVisibleColumns) => {
  //   setVisibleColumns(newVisibleColumns);
  // }, []);
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
            
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              componentsProps={{
                toolbar:{
                  showQuickFilter: true,
                },
                loadingOverlay: LinearProgress,
                
                
              }}
              //loading
              rows={formattedData}
              getRowId={(row) => row.id}
              // columnVisibilityModel={visibleColumns}
              // onColumnVisibilityChange={handleColumnVisibilityChange}
              onSelectionModelChange={(newSelection) => {
                const selectedItems = newSelection.map((id) => {
                  const row = formattedData.find((item) => item.id === id);
                  const fraudId = row ? row.fraud_id : null; // Replace `fraud_id` with the actual property name for fraud ID in your data
                  return { id, fraudId };
                });
                setSelection(selectedItems);
                console.log("selection", selectedItems);
              }}

            />
          </div>
        </>

        {popup2 ? (
          <>
            <div>
              <div className={styles.popup}>
                <div className="animate__animated animate__slideInDown">
                  <div className={styles.popupInner}>
                    <button className={styles.closeBtn} onClick={closePopup5}>
                      X
                    </button>
                    {/* {dataSource2.map((item) => ( */}
                    <div className={styles.alldiv}>
                      <h2 className={styles.title}>Fraud Management System </h2>
                      <form onSubmit={onSubmit}>
                        <div className={styles.form1}>
                          ID : {dataSource2.fraud_id}
                          <label>
                            Brief Description of The Fraud/Incident{" "}
                            <p>
                              <FaStarOfLife
                                style={{ marginBottom: "12px" }}
                                className="icon"
                                size="0.5rem"
                                color="red"
                              ></FaStarOfLife>
                            </p>
                          </label>
                          <div>
                            <textarea
                              name="description"
                              value={dataSource2.description}

                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                        <div className={styles.allform}>
                          <div className={styles.form1}>
                            <label>
                              Fraud Type{" "}
                              <p>
                                <FaStarOfLife
                                  style={{ marginBottom: "12px" }}
                                  className="icon"
                                  size="0.5rem"
                                  color="red"
                                ></FaStarOfLife>
                              </p>
                            </label>
                            <input
                              type="text"
                              name="fraud_type"
                              value={dataSource2.fraud_type}
                              onChange={handleChange}
                            ></input>
                          </div>
                          <div className={styles.form1}>
                            <label>
                              Fraud Method{" "}
                              <p>
                                <FaStarOfLife
                                  style={{ marginBottom: "12px" }}
                                  className="icon"
                                  size="0.5rem"
                                  color="red"
                                ></FaStarOfLife>
                              </p>
                            </label>
                            <input
                              type="text"
                              name="fraud_method"
                              value={dataSource2.fraud_method}
                              onChange={handleChange}
                            ></input>
                          </div>

                          <div className={styles.form1}>
                          <label>
                            Technology Use to Commit The Fraud{" "}
                            <p>
                              <FaStarOfLife
                                style={{ marginBottom: "12px" }}
                                className="icon"
                                size="0.5rem"
                                color="red"
                              ></FaStarOfLife>
                            </p>
                          </label>
                          <input
                            type="text"
                            name="technology_used_to_commit"
                            value={dataSource2.technology_used_to_commit}
                            onChange={handleChange}
                          ></input>
                        </div>
                          
                        </div>

                        <div className={styles.allform}>
                          <div className={styles.form1}>
                            <label>
                              Name of the suspected Fraudster
                              <p>
                                <FaStarOfLife
                                  style={{ marginBottom: "12px" }}
                                  className="icon"
                                  size="0.5rem"
                                  color="red"
                                ></FaStarOfLife>
                              </p>
                            </label>
                            <input
                              name="type_of_fraudster"
                              value={dataSource2.type_of_fraudster}
                              onChange={handleChange}
                            ></input>
                          </div>
                          <div className={styles.form1}>
                            <>
                              <label>
                                Name
                                <p>
                                  <FaStarOfLife
                                    style={{ marginBottom: "12px" }}
                                    className="icon"
                                    size="0.5rem"
                                    color="red"
                                  ></FaStarOfLife>
                                </p>
                              </label>
                              <input
                                type="text"
                                name="fraudster_name"
                                value={dataSource2.fraudster_name}
                                onChange={handleChange}
                              ></input>
                            </>
                          </div>
                          <div className={styles.form1}>
                          <>
                            <label>
                              Suspected Fraudster Profession
                              <p>
                                <FaStarOfLife
                                  style={{ marginBottom: "12px" }}
                                  className="icon"
                                  size="0.5rem"
                                  color="red"
                                ></FaStarOfLife>
                              </p>
                            </label>
                            <input
                              type="text"
                              name="fraudster_profession"
                              value={dataSource2.fraudster_profession}
                              onChange={handleChange}
                            ></input>
                          </>
                          </div>
                        </div>

                        <div className={styles.form1}>
                          <label>
                            Place/ Area where the Froud Occurred{" "}
                            <p>
                              <FaStarOfLife
                                style={{ marginBottom: "12px" }}
                                className="icon"
                                size="0.5rem"
                                color="red"
                              ></FaStarOfLife>
                            </p>
                          </label>
                          <div className={styles.allform}>
                            <div>
                              <label style={{ marginTop: "-10px" }}>
                                Branch{" "}
                                <p>
                                  <FaStarOfLife
                                    style={{ marginBottom: "12px" }}
                                    className="icon"
                                    size="0.5rem"
                                    color="red"
                                  ></FaStarOfLife>
                                </p>
                              </label>
                              <input
                                type="text"
                                name="areaof_fraud"
                                value={dataSource2.areaof_fraud}
                                onChange={handleChange}
                              ></input>
                            </div>
                            <div>
                              <label style={{ marginTop: "-10px" }}>
                                Location{" "}
                                <p>
                                  <FaStarOfLife
                                    style={{ marginBottom: "12px" }}
                                    className="icon"
                                    size="0.5rem"
                                    color="red"
                                  ></FaStarOfLife>
                                </p>
                              </label>
                              <input
                                type="text"
                                name="location"
                                value={dataSource2.location}
                                onChange={handleChange}
                              ></input>
                            </div>
                          </div>
                        </div>

                        <div className={styles.allform}>
                          <div className={styles.form1}>
                            <label>
                              Causes of Fraud{" "}
                              <p>
                                <FaStarOfLife
                                  style={{ marginBottom: "12px" }}
                                  className="icon"
                                  size="0.5rem"
                                  color="red"
                                ></FaStarOfLife>
                              </p>
                            </label>
                            <div>
                              <input
                                type="text"
                                name="cause_of_fraud"
                                value={dataSource2.cause_of_fraud}
                                onChange={handleChange}
                              ></input>
                            </div>
                          </div>

                          <div className={styles.form1}>
                            <label>
                              Date of Occerence of the Fraud{" "}
                              <p>
                                <FaStarOfLife
                                  style={{ marginBottom: "12px" }}
                                  className="icon"
                                  size="0.5rem"
                                  color="red"
                                ></FaStarOfLife>
                              </p>
                            </label>
                            <div>
                              <input
                                type="date"
                                name="occerence_date"
                                value={
                                  dataSource2.occerence_date
                                    ? new Date(dataSource2.occerence_date)
                                      .toISOString()
                                      .split("T")[0]
                                    : ""
                                }
                                onChange={handleChange}
                              ></input>
                            </div>
                          </div>

                          <div className={styles.form1}>
                            <label>
                              Date of Detection of the Fraud{" "}
                              <p>
                                <FaStarOfLife
                                  style={{ marginBottom: "12px" }}
                                  className="icon"
                                  size="0.5rem"
                                  color="red"
                                ></FaStarOfLife>
                              </p>
                            </label>
                            <div>
                              <input
                                type="date"
                                name="date_of_detection"
                                value={
                                  dataSource2.date_of_detection
                                    ? new Date(dataSource2.date_of_detection)
                                      .toISOString()
                                      .split("T")[0]
                                    : ""
                                }
                                onChange={handleChange}
                              ></input>
                            </div>
                          </div>
                        </div>

                        <div className={styles.allform}>
                          <div className={styles.form1}>
                            <label>
                              Fraud Amount Type
                              <p>
                                <FaStarOfLife
                                  style={{ marginBottom: "12px" }}
                                  className="icon"
                                  size="0.5rem"
                                  color="red"
                                ></FaStarOfLife>
                              </p>
                            </label>
                            <input
                              type="text"
                              name="fraud_amount_type"
                              value={dataSource2.fraud_amount_type}
                              onChange={handleChange}
                            ></input>
                          </div>
                          <div className={styles.form1}>
                            <>
                              <label>
                                Amount
                                <p>
                                  <FaStarOfLife
                                    style={{ marginBottom: "12px" }}
                                    className="icon"
                                    size="0.5rem"
                                    color="red"
                                  ></FaStarOfLife>
                                </p>
                              </label>
                              <input
                                type="text"
                                name="fraud_amount"
                                value={dataSource2.fraud_amount}
                                onChange={handleChange}
                              ></input>
                            </>
                          </div>
                        </div>

                        <div className={styles.allform}>
                          <div className={styles.form1}>
                            <label>
                              Amount Recoverd{" "}
                              <p>
                                <FaStarOfLife
                                  style={{ marginBottom: "12px" }}
                                  className="icon"
                                  size="0.5rem"
                                  color="red"
                                ></FaStarOfLife>
                              </p>
                            </label>
                            <div>
                              <input
                                type="text"
                                name="amount_recoverd"
                                value={dataSource2.amount_recoverd}
                                onChange={handleChange}
                              ></input>
                            </div>
                          </div>
                        </div>

                        <div className={styles.form1}>
                          <label>
                            Action Taken or Proposed to be Taken to Avoid such
                            Incidents{" "}
                            <p>
                              <FaStarOfLife
                                style={{ marginBottom: "12px" }}
                                className="icon"
                                size="0.5rem"
                                color="red"
                              ></FaStarOfLife>
                            </p>
                          </label>
                          <div>
                            <textarea
                              name="action_taken"
                              value={dataSource2.action_taken}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                        <div>
                          <button type="submit" className={styles.button}>
                            Update
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* ))} */}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <Footer />
      </div>
    </>
  );
}
