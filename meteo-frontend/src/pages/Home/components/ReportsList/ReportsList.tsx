import React from "react";
import './style.css';
import { WeatherReport } from "../../../../data/model";
import ReportItem from "./ReportItem";

interface Props {
    data: WeatherReport[]
}

const ReportsList:React.FC<Props> = ({data}) => {

    return (
        <ul className="reports__list">
            {data.length > 0 && data.map((item: WeatherReport, index: number) => {
                return (
                    <ReportItem item={item} />
                )
            })}
        </ul>
    )
}

export default ReportsList;