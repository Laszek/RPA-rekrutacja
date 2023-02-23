import React from "react";
import './style.css';
import { WeatherReport } from "../../../data/model";
import ReportItem from "../../../components/ReportItem";
import Grid from "@mui/material/Grid"

interface Props {
    data: WeatherReport[]
}

const ReportsList:React.FC<Props> = ({data}) => {

    return (
        <Grid container spacing={2} className="reports__list">
            {data.length > 0 && data.map((item: WeatherReport, index: number) => {
                return (
                    <Grid item xs={4}>
                        <ReportItem item={item} />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default ReportsList;