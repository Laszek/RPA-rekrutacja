import React, { useEffect, useState } from "react";
import './style.css';
import ReportsList from "./components/ReportsList/ReportsList";
import axios from "axios";
import { WeatherReport } from "../../data/model";
import NewEditReportModal from "./components/NewEditReportModal";


const Home = () => {
    const [data, setData] = useState<WeatherReport[]>([]);
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [editedReport, setEditedReport] = useState<WeatherReport | null>(null)

    const handleCreateNewReport = () => {
        setIsModalActive(true)
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/reports")
            .then(result => {
                console.log(result.data)
                setData(result.data)
            })
    }, [])

    return (
        <div
            className="reports"
        >
            <button className="add-btn" onClick={handleCreateNewReport}>
                <img src="/icons/add.png" alt="add" />
                Create New
            </button>
            <ReportsList data={ data }/>
            {isModalActive && <NewEditReportModal
                report={editedReport}
                newReportsHandler={(data) => setData(data)}
                closeModalHandler={() => setIsModalActive(false)}
            />}
        </div>
    )
}

export default Home;