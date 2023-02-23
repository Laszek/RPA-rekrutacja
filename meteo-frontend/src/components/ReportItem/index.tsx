import React, { useState } from "react";
import './style.css';
import { WeatherReport } from "../../data/model";
import { Simulate } from "react-dom/test-utils";
import Paper from "@mui/material/Paper";
import {
    Box, Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton, Radio,
    RadioGroup, Stack,
    TextField,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Modal from '@mui/material/Modal';

interface Props {
    item: WeatherReport
}

const ReportItem: React.FC<Props> = ({ item }) => {
    const [editModalActive, setEditModalActive] = useState<boolean>(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        p: 4,
    };

    return (
        <>
            <Paper elevation={2} className="list-item">
                <Typography variant="h3" fontSize="21px" className="city">{ item.city }</Typography>
                <div className="details">
                    <p className="temperature">
                        { item.unit === "K"
                            ? item.temperature
                            : (item.unit === "C"
                                ? (Math.round((parseFloat(item.temperature.toString()) + 273.15) * 100 / 100))
                                : (Math.round(((parseFloat(item.temperature.toString()) - 32) * (5 / 9) + 273.15) )))
                        }
                        &deg;K
                    </p>
                    <Box>
                        <IconButton color="secondary" size="small" aria-label="edit" onClick={()=>setEditModalActive(true)}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                </div>
            </Paper>
            <Modal
                open={editModalActive}
                onClose={()=>{setEditModalActive(false)}}
            >
                <Paper sx={ style }>
                    <h2>{
                        'Edit Report Form'
                    }</h2>
                    <form className="form">
                        <TextField
                            variant="outlined"
                            label="City"
                            name="city"
                            id="city"
                        />
                        <TextField
                            variant="outlined"
                            label="Temperature"
                            name="temp"
                            id="temp"
                            type="number"
                        />

                        <FormControl>
                            <FormLabel id="units-row-radio-buttons-group-label">Units</FormLabel>
                            <RadioGroup row name="units-row-radio-buttons-group">
                                <FormControlLabel
                                    value="C"
                                    control={<Radio />}
                                    label="Celcius"
                                />
                                <FormControlLabel
                                    value="K"
                                    control={<Radio />}
                                    label="Kelvin"
                                />
                                <FormControlLabel
                                    value="F"
                                    control={<Radio />}
                                    label="Farenheit"
                                />
                            </RadioGroup>
                        </FormControl>
                        <Stack spacing={2}>
                            <Button variant={"contained"} type="submit" >
                                Submit
                            </Button>
                            <Button variant={"outlined"} onClick={ ()=>{setEditModalActive(false)} }>
                                Cancel
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Modal>
        </>
    )
}

export default ReportItem;