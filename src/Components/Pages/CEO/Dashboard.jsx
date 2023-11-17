import styles from './dashboard.module.css'
import { useState, useEffect } from 'react';
import { FaUsers } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../../common/Header';
import axios from "axios";

function Dashboard() {
    const [count, setCount] = useState(0);
    const [allcount, setAllCount] = useState(0);
    const [legalcount, setLegalCount] = useState(0);
    const [hrcount, setHRCount] = useState(0);
    const [closedcount, setClosedCount] = useState(0);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/ceoreport', { state: { source: 'New' } });
    };
    useEffect(() => {
        axios.post('http://10.57.40.130:8022/api/all-fraud-count')
            .then(response => setAllCount(JSON.stringify(response.data))

            )

            .catch(error => console.error(error));

        axios.post('http://10.57.40.130:8022/api/new-fraud-count')
            .then(response => setCount(JSON.stringify(response.data))

            )

            .catch(error => console.error(error));
        axios.post('http://10.57.40.130:8022/api/hrcount')
            .then(response => setHRCount(JSON.stringify(response.data))

            )

            .catch(error => console.error(error));

        axios.post('http://10.57.40.130:8022/api/legalcount')
            .then(response => setLegalCount(JSON.stringify(response.data))

            )

            .catch(error => console.error(error));

        axios.post('http://10.57.40.130:8022/api/closedcount')
            .then(response => setClosedCount(JSON.stringify(response.data))

            )

            .catch(error => console.error(error));
    }, []);
    return (
        <>
            <Header path="/CEO" />

            <div className={styles.container}>

                {/* <Header /> */}

                {/* <SideBar active='/home'/> */}

                <div className={styles.dashboard}>

                    <Link to='/ceoreport' onClick={handleNavigate} state={{ source: 'New' }} style={{ textDecoration: 'none' }} >
                        <div className={styles.card}>
                            <p>New Fraud</p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '5%' }}>
                                <label><FaUsers></FaUsers></label>
                                <label style={{ display: 'flex', fontSize: '24px', marginTop: '8px' }}>{count}</label>
                            </div>
                        </div>
                    </Link>

                    <Link to='/ceoreport' style={{ textDecoration: 'none' }} >
                        <div className={styles.card}>
                            <p>All Fraud</p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '5%' }}>
                                <label><FaUsers></FaUsers></label>
                                <label style={{ display: 'flex', fontSize: '24px', marginTop: '8px' }}>{allcount}</label>
                            </div>
                        </div>
                    </Link>

                    {/* <Link to='/hrreport' style={{ textDecoration: 'none' }} >
                        <div className={styles.card}>
                            <p>HR Report</p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '5%' }}>
                                <label><FaUsers></FaUsers></label>
                                <label style={{ display: 'flex', fontSize: '24px', marginTop: '8px' }}>{hrcount}</label>
                            </div>
                        </div>
                    </Link>

                    <Link to='/legalreport' style={{ textDecoration: 'none' }} >
                        <div className={styles.card}>
                            <p>Legal Report</p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '5%' }}>
                                <label><FaUsers></FaUsers></label>
                                <label style={{ display: 'flex', fontSize: '24px', marginTop: '8px' }}>{legalcount}</label>
                            </div>
                        </div>
                    </Link> */}
                    <Link to='/ceoreport' onClick={handleNavigate} state={{ source: 'Closed' }} style={{ textDecoration: 'none' }} >
                        <div className={styles.card}>
                            <p>Closed Report</p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '5%' }}>
                                <label><FaUsers></FaUsers></label>
                                <label style={{ display: 'flex', fontSize: '24px', marginTop: '8px' }}>{closedcount}</label>
                            </div>
                        </div>
                    </Link>
                </div>

            </div>

        </>
    )
}

export default Dashboard