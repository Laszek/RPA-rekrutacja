import React, { ChangeEvent, FormEvent, useState } from "react";
import './style.css';
import { WeatherReport } from "../../../../data/model";
import axios from "axios";

interface Props {
    report: WeatherReport | null,
    newReportsHandler: (data: WeatherReport[]) => void,
    closeModalHandler: () => void
}

const NewEditReportModal: React.FC<Props> = ({ report, newReportsHandler, closeModalHandler }) => {
    const [cityVal, setCityVal] = useState<string>("");
    const [tempVal, setTempVal] = useState<string>("");
    const [unitVal, setUnitVal] = useState<string>("");

    const onUnitValChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUnitVal(e.target.value)
    }

    const onPostNewReport = (e: FormEvent) => {
        e.preventDefault();
        const date = new Date()
        const newReport = {
            city: cityVal,
            temperature: tempVal,
            unit: unitVal,
            date: `${ date.getFullYear() }-${ date.getMonth() < 9 && "0" }${ date.getMonth() + 1 }-${ date.getDay() < 9 && "0" }${ date.getDay() + 1 }`
        }
        axios.post("http://localhost:8000/api/reports", newReport)
            .then((response) => {
                newReportsHandler(response?.data)
            })
            .finally(() => {
                closeModalHandler();
            })
    }

    return (
        <div className="modal-container">
            <div className="modal">
                <h2>{
                    report !== null ? 'Edit Report Form' : 'New Report Form'
                }</h2>
                <form onSubmit={ onPostNewReport } className="form">
                    <label htmlFor="city">City</label>
                    <input
                        name="city"
                        id="city"
                        value={ cityVal }
                        onChange={ (e) => setCityVal(e.target.value) }
                    />

                    <label htmlFor="temp">Temperature</label>
                    <input
                        name="temp"
                        id="temp"
                        type="number"
                        value={ tempVal }
                        onChange={ (e) => setTempVal(e.target.value) }
                    />

                    <fieldset>
                        <div>
                            <input
                                name="unit"
                                id="celcius"
                                type="radio"
                                value="C"
                                checked={ unitVal === "C" }
                                onChange={ onUnitValChange }
                            />
                            <label htmlFor="celcius">C</label>
                        </div>
                        <div>
                            <input
                                name="unit"
                                id="kelvin"
                                type="radio"
                                value="K"
                                checked={ unitVal === "K" }
                                onChange={ onUnitValChange }
                            />
                            <label htmlFor="kelvin">K</label>
                        </div>
                        <div>
                            <input
                                name="unit"
                                id="farenheit"
                                type="radio"
                                value="F"
                                checked={ unitVal === "F" }
                                onChange={ onUnitValChange }
                            />
                            <label htmlFor="farenheit">F</label>
                        </div>
                    </fieldset>
                    <button onClick={ closeModalHandler } className="btn cancel">Cancel</button>
                    <button type="submit" className="btn submit">Submit</button>
                </form>
            </div>
            <div className="backdrop" onClick={ closeModalHandler }/>
        </div>
    )
}

export default NewEditReportModal;