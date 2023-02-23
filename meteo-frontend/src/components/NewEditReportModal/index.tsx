import React, { ChangeEvent, FormEvent, useState } from "react";
import './style.css';
import { WeatherReport } from "../../data/model";
import axios from "axios";
import {
    Paper,
    FormControl,
    TextField,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    Stack,
    Button
} from "@mui/material";

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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        p: 4,
    };

    return (
        <Paper sx={ style }>
            <h2>{
                report !== null ? 'Edit Report Form' : 'New Report Form'
            }</h2>
            <form onSubmit={ onPostNewReport } className="form">
                <TextField
                    variant="outlined"
                    label="City"
                    name="city"
                    id="city"
                    value={ cityVal }
                    onChange={ (e) => setCityVal(e.target.value) }
                />
                <TextField
                    variant="outlined"
                    label="Temperature"
                    name="temp"
                    id="temp"
                    type="number"
                    value={ tempVal }
                    onChange={ (e) => setTempVal(e.target.value) }
                />

                <FormControl>
                    <FormLabel id="units-row-radio-buttons-group-label">Units</FormLabel>
                    <RadioGroup row name="units-row-radio-buttons-group">
                        <FormControlLabel
                            value="C"
                            control={<Radio
                                checked={ unitVal === "C" }
                                onChange={ onUnitValChange } />}
                            label="Celcius"
                        />
                        <FormControlLabel
                            value="K"
                            control={<Radio
                                checked={ unitVal === "K" }
                                onChange={ onUnitValChange } />}
                            label="Kelvin"
                        />
                        <FormControlLabel
                            value="F"
                            control={<Radio
                                checked={ unitVal === "F" }
                                onChange={ onUnitValChange } />}
                            label="Farenheit"
                        />
                    </RadioGroup>
                </FormControl>
                <Stack spacing={2}>
                    <Button variant={"contained"} type="submit" >
                        Submit
                    </Button>
                    <Button variant={"outlined"} onClick={ closeModalHandler }>
                        Cancel
                    </Button>
                </Stack>
            </form>
        </Paper>
    )
}

export default NewEditReportModal;