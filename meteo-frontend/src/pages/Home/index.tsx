import React, { useEffect, useState } from "react";
import './style.css';
import ReportsList from "./ReportsList/ReportsList";
import axios from "axios";
import { WeatherReport } from "../../data/model";
import NewEditReportModal from "../../components/NewEditReportModal";
import Button from "@mui/material/Button"
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";


const Home = () => {
    const [data, setData] = useState<WeatherReport[]>([]);
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [editedReport, setEditedReport] = useState<WeatherReport | null>(null)

    const handleShowEditModal = () => {
        setIsModalActive(true)
    }
    const handleHideEditModal = () => {
        setIsModalActive(false)
    }


    useEffect(() => {
        axios.get("http://localhost:8000/api/reports")
            .then(result => {
                console.log(result.data)
                setData(result.data)
            })
    }, [])

    return (
        <>
            <Container
                className="reports"
            >
                <Button variant="contained" className="add-btn" onClick={handleShowEditModal}>
                    <AddIcon />
                    Create New
                </Button>
                <ReportsList data={ data }/>
            </Container>
            <Modal
                open={isModalActive}
                onClose={handleHideEditModal}
            >
                <NewEditReportModal
                    report={editedReport}
                    newReportsHandler={(data) => setData(data)}
                    closeModalHandler={() => setIsModalActive(false)}
                />
            </Modal>
        </>
    )
}

export default Home;