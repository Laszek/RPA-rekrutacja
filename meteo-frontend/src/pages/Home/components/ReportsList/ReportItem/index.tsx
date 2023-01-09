import React, { useState } from "react";
import './style.css';
import { WeatherReport } from "../../../../../data/model";
import { Simulate } from "react-dom/test-utils";

interface Props {
    item: WeatherReport
}

const ReportItem: React.FC<Props> = ({ item }) => {
    const [dropdownActive, setDropdownActive] = useState<boolean>(false)

    const onDropdownOn = () => {
        setDropdownActive(!dropdownActive)
    }
    const handleMenuEdit = () => {
        setDropdownActive(false);
    };

    const handleMenuDelete = () => {
        setDropdownActive(false);
    };

    return (
        <li className="list-item">
            <h3 className="city">{ item.city }</h3>
            <div className="details">
                <p className="temperature">
                    { item.unit === "K"
                        ? item.temperature
                        : (item.unit === "C"
                            ? (Math.round((item.temperature + 373.15) * 100 / 100))
                            : (Math.round((item.temperature * (5 / 9) + 459.67) * 100 / 100)))
                    }
                    &deg;K
                </p>
                <div>
                    <button
                        className="options-btn"
                        onClick={ onDropdownOn }
                    >
                        <img src={ dropdownActive ? "/icons/arrow-top_selected.png" : "/icons/arrow-bottom.png" }
                             alt=""/></button>
                    { dropdownActive && <ul className="menu">
                        <li className="menu-item">
                            <button>Menu 1</button>
                        </li>
                        <li className="menu-item">
                            <button>Menu 2</button>
                        </li>
                    </ul> }
                </div>
            </div>
            <p className="date">Last update: <span>{ item.date }</span></p>
        </li>
    )
}

export default ReportItem;