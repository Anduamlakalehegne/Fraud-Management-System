import React from 'react'
import Header from '../../../common/Header'
import Footer from '../../../common/Footer'
import styles from '../../../asset/style/report.module.css'
// import { Report_Data } from "../../asset/data/jsonData"
import { Pagination } from 'antd';
import { useState, useRef, useEffect } from 'react'
import { CSVLink, CSVDownload } from "react-csv";
import axios from 'axios';
import { FaStarOfLife } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";



export default function LegalAction_Report() {
   
    const [dataSource, setDataSource] = useState([])
    const [totalPages, setTotalPage] = useState(1);
    const navigate = useNavigate();
 
    const loddata = async () => {
        const response = await axios.get("http://10.57.40.130:8022/api/fetchfraudlegal")
        setDataSource(response.data);
        setTotalPage(response.data.length)
    }
    useEffect(() => {
        loddata()
    }, []);


    const [page, setCurentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(5);
    const indexOfLastPage = page * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPage = dataSource.slice(indexOfFirstPage, indexOfLastPage);

    const onShowSizeChange = (current, pageSize) => {
        setpostPerPage(pageSize);
    }

    const [popup, setPop] = useState(false);
    const [popup2, setPop2] = useState(false);
    const handleClickopen = () => {
        setPop(!popup);
    }
    const handleClickopen1 = () => {
        setPop2(!popup);
    }
    const closePopup5 = () => {
        setPop(false);
        setPop2(false);
    }
    // const [dataSource2, setDataSource2] = useState([])
    // const selectById = async (id) => {
    //     const response = await axios.get(`http://10.57.40.130:3008/api/fraud/fetch/${id}`)
    //     setDataSource2(response.data);
    // }
    // useEffect(() => {
    //     selectById()
    // }, []);


    // const updateData = async (id) => {
    //     const response = await axios.get(`http://10.57.40.130:3008/api/fraud/fetch/${id}`)
    //     // setDataSource2(response.data);
    // }
    // useEffect(() => {
    //     updateData()
    // }, []);


    const renderUpdateButton = (params, fraudId) => {
        return (
          <strong>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              //style={{ marginLeft: 16 }}
              onClick={() => {
                navigate(`/legalAction/${fraudId}`);
              }}
            >
              Update 
            </Button>
          </strong>
        );
      };
    


    const columns = [
        {
          field: "fraud_id",
          headerName: "ID ",
          width: 60,
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
          field: "amount_recoverd",
          headerName: "Amount Recoverd",
          width: 150,
          headerClassName: "column-header",
          cellClassName: "column-cell",
        },
        {
          field: "Update",
          renderCell: (params) => renderUpdateButton(params, params.row.fraud_id),
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
                <Header path="/legalAction" />
                
                <>

                    <div style={{ height: "75vh", width: "95%", margin: 'auto', marginTop: '40px', marginBottom:'120px' }}>
                        <p style={{fontSize:'30px', fontWeight:'550', color:'#ff6b0b'}}>Fraud Report</p>
                        <DataGrid
                            sx={{ m: 2 }}
                            checkboxSelection
                            rows={formattedData}
                            columns={columns}
                            components={{ Toolbar: GridToolbar }}
                        />
                    </div>
                </>

                {popup2 ?
                    <>
                        <div>
                            <div className={styles.popup}>
                                <div className='animate__animated animate__slideInDown'>
                                    <div className={styles.popupInner}>
                                        <button className={styles.closeBtn} onClick={closePopup5}>X</button>
                                        {dataSource.map(item => (
                                            <div className={styles.alldiv}>

                                                <h2 className={styles.title}>Fraud Management System </h2>
                                                <div className={styles.form1}>
                                                    ID : {item.id}
                                                    <label>Brief Description of The Fraud/Incident <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                                    <div>
                                                        <textarea name='Description' value={item.description}></textarea>
                                                    </div>
                                                </div>
                                                <div className={styles.allform}>
                                                    <div className={styles.form1}>
                                                        <label>Fraud Type <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                                        <input type='text' name='fraudType' value={item.fraudtype}></input>
                                                    </div>
                                                    <div className={styles.form1}>
                                                        <label>Fraud Method <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                                        <input type='text' name='fraudMethod' value={item.fraudmethod} ></input>
                                                    </div>
                                                </div>

                                                <div className={styles.allform}>
                                                    <div className={styles.form1}>
                                                        <label>Name of the suspected Fraudster <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                                        <input name='nameOfFaudster' value={item.typeoffraudster}></input>
                                                    </div>
                                                    <div className={styles.form1}>
                                                        <>
                                                            <label>Name {item.stuffname}<p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                                            <input type='text' name='stuffName' value={item.fraudstername} ></input>
                                                        </>
                                                    </div>
                                                </div>

                                                <div className={styles.form1}>
                                                    <label>Place/ Area where the Froud Occurred <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                                    <div className={styles.allform}>
                                                        <div>
                                                            <label style={{ marginTop: '-10px' }}>Branch <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                                            <input type='text' value={item.areaoffraud}></input>
                                                        </div>
                                                        <div>
                                                            <label style={{ marginTop: '-10px' }}>Location <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                                            <input type='text' value={item.location}></input>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={styles.allform}>

                                                    <div className={styles.form1}>
                                                        <label>Causes of Fraud <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                                        <div>
                                                            <input type="text" value={item.causeoffraud}></input>
                                                        </div>
                                                    </div>

                                                    <div className={styles.form1}>
                                                        <label>Date of Occerence of the Fraud <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                                        <div>
                                                            <input type="date" value={item.occerencedate}></input>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={styles.allform}>
                                                    <div className={styles.form1}>
                                                        <label>Fraud Amount Type<p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                                        <input type="text" value={item.fraudamounttype}></input>
                                                    </div>
                                                    <div className={styles.form1}>
                                                        <>
                                                            <label>Amount {item.stuffname}<p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                                            <input type='text' name='stuffName' value={item.fraudamount} ></input>
                                                        </>
                                                    </div>
                                                </div>


                                                <div className={styles.allform}>
                                                    <div className={styles.form1}>
                                                        <label>Amount Recoverd <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                                        <div>
                                                            <input type="text" value={item.amountrecoverd}></input>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={styles.form1}>
                                                    <label>Action Taken or Proposed to be Taken to Avoid such Incidents <p><FaStarOfLife style={{ marginBottom: "12px" }} className='icon' size="0.5rem" color='red'></FaStarOfLife></p></label>
                                                    <div >
                                                        <textarea value={item.actiontaken}></textarea>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button type="submit" className={styles.button}>Update</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : ""}

                <Footer />
            </div>

        </>
    )
}
