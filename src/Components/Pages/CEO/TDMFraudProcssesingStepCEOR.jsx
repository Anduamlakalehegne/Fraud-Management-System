import React from "react";
import Header from "../../../common/Header";
import Footer from "../../../common/Footer";
import styles from "../../../asset/style/report.module.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaStarOfLife } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

import { useParams } from "react-router-dom";
export default function TDMFraudProcssesingStepCEOR() {
  const [dataSource, setDataSource] = useState([]);

  const navigate = useNavigate();
  const loggedInUser = JSON.parse(sessionStorage.getItem("user2"));
  const { id } = useParams();

  const datas = {
    fraudId: id
  }
  const loddata = async () => {
    const response = await axios.post('http://10.57.40.130:8022/api/fetchOnProcessfraudTdm', datas);
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


  // const renderUpdateButton = (params, fraudId, dscription) => {
  //   return (
  //     <strong>
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         size="medium"
  //         //style={{ marginLeft: 16 }}
  //         onClick={() => {
  //           navigate(`/assignHrdep/${fraudId}/${dscription}`);
  //         }}
  //       >
  //         Assign
  //       </Button>
  //     </strong>
  //   );
  // };
  // const renderStatusButton = (params, fraudId, dscription) => {
  //   return (
  //     <strong>
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         size="medium"
  //         //style={{ marginLeft: 16 }}
  //         onClick={() => {
  //           navigate(`/hractiontaken/${fraudId}`);
  //         }}
  //       >
  //         Update Status
  //       </Button>
  //     </strong>
  //   );
  // };

  const columns = [
    {
      field: 'fraud_id',
      headerName: 'Fraud ID',
      width: 150
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200
    },
    {
      field: 'fraud_type',
      headerName: 'Fraud Type',
      width: 150
    },
    {
      field: 'fraud_method',
      headerName: 'Fraud Method',
      width: 150
    },
    {
      field: 'areaof_fraud',
      headerName: 'Area of Fraud',
      width: 150
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 150
    },
    {
      field: 'fraud_amount_type',
      headerName: 'Fraud Amount Type',
      width: 180
    },
    {
      field: 'fraud_amount',
      headerName: 'Fraud Amount',
      width: 150
    },
    {
      field: 'cause_of_fraud',
      headerName: 'Cause of Fraud',
      width: 180
    },
    {
      field: 'occerence_date',
      headerName: 'Occurrence Date',
      width: 180
    },
    {
      field: 'type_of_fraudster',
      headerName: 'Type of Fraudster',
      width: 180
    },
    {
      field: 'fraudster_name',
      headerName: 'Fraudster Name',
      width: 180
    },
    {
      field: 'action_taken',
      headerName: 'Action Taken',
      width: 150
    },
    {
      field: 'amount_recoverd',
      headerName: 'Amount Recovered',
      width: 180
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150
    },
    {
      field: 'inserted_by',

      headerName: 'Inserted By',
      width: 150
    },
    {
      field: 'inserted_at',
      headerName: 'Inserted At',
      width: 150
    },
    {
      field: 'task_id',
      headerName: 'Task ID',
      width: 150
    },
    {
      field: 'remark',
      headerName: 'Remark',
      width: 150
    },
    {
      field: 'task',
      headerName: 'Task',
      width: 150
    },
    {
      field: 'processing_step_inserted_by',
      headerName: 'Processing Step Inserted By',
      width: 220
    },
    {
      field: 'processing_step_inserted_at',
      headerName: 'Processing Step Inserted At',
      width: 220
    },
    {
      field: 'tdm_processing_status',
      headerName: 'TDM Processing Status',
      width: 220
    },
    {
      field: 'status_remark',
      headerName: 'Status Remark', width: 150
    },
    {
      field: 'status_inserted_by',
      headerName: 'Status Inserted By',
      width: 180
    },
    {
      field: 'status_inserted_at',
      headerName: 'Status Inserted At', width: 180
    },
    {
      field: 'talent_mangment_fraud_status',
      headerName: 'Talent Management Fraud Status',
      width: 250
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

        <Header path="/CEO" />

        <>
          {/* <div className={styles.vehicle_search}>
                        <p title='search'>
                           
                            <input type="text" id="myInput" placeholder="Search"></input>
                            <button>Search</button>
                        </p>
                    </div>
                    <div className={styles.outer_vehicle_table} id='myTable'>

                        <p>Fraud Report</p>

                        <table className={styles.vehicle_table} id="table-to-xls">

                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Brief_Discripion_of_The_Fraud/Incident</th>
                                    <th>Fraud_Type</th>
                                    <th>Fraud_Method</th>
                                    <th>Area_where_the_Froud_Occurred</th>
                                    <th>Location</th>
                                    <th>Detail</th>
                                    <th>Delete</th>

                                </tr>
                            </thead>

                            <tbody>
                                {currentPage.map(item => (
                                    <tr className="active_row">
                                        <td>{item.id}</td>
                                        <td>{item.description}</td>
                                        <td>{item.fraudtype}</td>
                                        <td>{item.fraudmethod}</td>
                                        <td>{item.areaoffraud}</td>
                                        <td>{item.location}</td>
                                        <td><button onClick={() => {
                                            handleClickopen1()
                                            selectById(item.id)
                                        }}>Detail</button></td>
                                        <td><button onClick={() => { updateData(item.id) }}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}

          {/* <div className={styles.page}>
                        <Pagination
                            onChange={(page) => setCurentPage(page)}
                            pageSize={postPerPage}
                            current={page}
                            total={totalPages}
                            showQuickJumper
                            showSizeChanger
                            onShowSizeChange={onShowSizeChange}
                        />
                    </div>

                    <div className={styles.exportButton}>
                        <CSVLink style={{ textDecoration: "none" }} data={dataSource}><p>Download</p></CSVLink>
                    </div>
*/}

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

        {popup2 ? (
          <>
            <div>
              <div className={styles.popup}>
                <div className="animate__animated animate__slideInDown">
                  <div className={styles.popupInner}>
                    <button className={styles.closeBtn} onClick={closePopup5}>
                      X
                    </button>
                    {dataSource.map((item) => (
                      <div className={styles.alldiv}>
                        <h2 className={styles.title}>
                          Fraud Management System{" "}
                        </h2>
                        <div className={styles.form1}>
                          ID : {item.id}
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
                              name="Description"
                              value={item.description}
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
                              name="fraudType"
                              value={item.fraudtype}
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
                              name="fraudMethod"
                              value={item.fraudmethod}
                            ></input>
                          </div>
                        </div>

                        <div className={styles.allform}>
                          <div className={styles.form1}>
                            <label>
                              Name of the suspected Fraudster{" "}
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
                              name="nameOfFaudster"
                              value={item.typeoffraudster}
                            ></input>
                          </div>
                          <div className={styles.form1}>
                            <>
                              <label>
                                Name {item.stuffname}
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
                                name="stuffName"
                                value={item.fraudstername}
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
                                value={item.areaoffraud}
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
                              <input type="text" value={item.location}></input>
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
                                value={item.causeoffraud}
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
                                value={item.occerencedate}
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
                              value={item.fraudamounttype}
                            ></input>
                          </div>
                          <div className={styles.form1}>
                            <>
                              <label>
                                Amount {item.stuffname}
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
                                name="stuffName"
                                value={item.fraudamount}
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
                                value={item.amountrecoverd}
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
                            <textarea value={item.actiontaken}></textarea>
                          </div>
                        </div>
                        <div>
                          <button type="submit" className={styles.button}>
                            Update
                          </button>
                        </div>
                      </div>
                    ))}
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
