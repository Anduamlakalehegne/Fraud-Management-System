import React from "react";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";
import { FaStarOfLife } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import styles from "../../../asset/style/report.module.css";
import Swal from "sweetalert2";


export default function HR_Report() {
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const loggedInUser = JSON.parse(sessionStorage.getItem("user2"));
  const [formState, setFormState] = useState({
    hr: false,
    legal: false,
  });
  const [selection, setSelection] = useState([]);

  const loddata = async () => {
    try {
      const response = await axios.get("http://10.57.40.130:8022/api/fetchAllHr");
      setDataSource(response.data);
    } catch (error) {
      console.error(error);
      // Handle the error, such as displaying an error message or retrying the request
    }
  };

  useEffect(() => {
    loddata();
  }, []);

  const [popup2, setPop2] = useState(false);

  const handleClickopen = (fraudId) => {
    setPop2(!popup2);
    selectById(fraudId);


  };


  const closePopup5 = () => {

    setPop2(false);
  };

  const selectById = async (id) => {
    const response = await axios.get(
      `http://10.57.40.130:8022/api/fetchFraud/${id}`
    );
    console.log("this is ", id);
    setDataSource2(response.data);
    setSelection(id);
    console.log("this is data source 2", id);
  };
  useEffect(() => {
    selectById();
  }, []);





  const formattedData = dataSource.map((item, index) => ({
    id: index + 1,
    // Assign a unique id to each row
    ...item,
    // statusmsg: item.res_json.statusmsg,
    // transactionID: item.res_json.transactionID,
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataSource2((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  const renderUpdateButton = (params, fraudId) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          //style={{ marginLeft: 16 }}
          onClick={() => {
            handleClickopen(fraudId);
          }}
        >
          Fraud Detail
        </Button>
      </strong>
    );
  };

  const renderCloseStatusButton = (params, fraudId) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="error"
          size="small"
          //style={{ marginLeft: 16 }}
          onClick={async () => {
            try {
              const response = await axios.put(`http://10.57.40.130:8022/api/updateHrStatus/${fraudId}`);
              // Handle the response if needed
              console.log(response.data);

              Swal.fire({
              title: "Action Done Successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
            } catch (error) {
              // Handle errors
              console.error(error);
            }
          }}
        >
          Close Fraud
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
      field: "action_taken_by_chco",
      headerName: "Action Taken BY Chief Human Capital Officer",
      width: 310,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      // valueFormatter: ({ value }) => (value ? "true" : "false"),
    },
    {
      field: "action_taken_by_tmd",
      headerName: "Action Taken By Talent Management",
      width: 310,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "action_taken_dc",
      headerName: "Action Taken by Discipline",
      width: 310,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "action_taken_by_deb_pm",
      headerName: "Action Taken BY Director Employee Benefits & Performance Managment",
      width: 310,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "decision_of_chco",
      headerName: "Decision Of Chief Human Capital Officer",
      width: 310,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "action_Taken_by_dtm",
      headerName: "Action Taken BY Director Talent Management",
      width: 310,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "Fraud Detail",
      width:150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      renderCell: (params) => renderUpdateButton(params, params.row.fraud_id),
    }, 
    {
      field: "Close Status",
      width: 150,
      renderCell: (params) => renderCloseStatusButton(params, params.row.fraud_id),
    }

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
              HR Action Taken Report
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
                      <h2 className={styles.title}>Fraud  Detail </h2>
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
                              disabled={true}
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
                              disabled={true}
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
                              disabled={true}
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
                              disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                              disabled={true}
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
                                disabled={true} ></input>
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
                                disabled={true} ></input>
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
                              disabled={true} ></textarea>
                          </div>
                        </div>
                        <div>
                          {/* <button type="submit" className={styles.button}>
                            Update
                          </button> */}
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
