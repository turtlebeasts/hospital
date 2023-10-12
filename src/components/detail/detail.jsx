import React, {useState, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Card from '@mui/material/Card';
import Button from "@mui/material/Button"
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from "@mui/material/AccordionSummary"
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';

const Details = ({data}) => {
    const [diag, setDiag] = useState([])
    const [panel, setPanel] = useState(0)

    useEffect(() => {
        async function getDiagnosis(id) {
            const response = await fetch("http://localhost/hospital/index.php?getDiag=" + id)
            const result = await response.json()
            setDiag(result)
        }
        getDiagnosis(data.patient_ID)
    }, [])

    return (
        <>
            <Grid container
                spacing={2}>
                <Grid item
                    xs={6}>
                    <Typography variant="h6">
                        {
                        `${
                            data.first_name
                        } ${
                            data.middle_name
                        } ${
                            data.last_name
                        }`
                    } </Typography>
                    <Typography variant="h6">
                        Age : {
                        data.age
                    } </Typography>
                    <Typography variant="h6">
                        Email : {
                        data.email !== '' ? data.email : "No emails registered"
                    } </Typography>
                    <Typography variant="h6">
                        Phone : {
                        data.phone !== '' ? data.phone : "No emails phone"
                    } </Typography>

                    <Typography variant="h6">
                        Address : {
                        data.address !== '' ? data.address : "No emails address"
                    } </Typography>
                </Grid>
                <Grid item
                    xs={6}>
                    <Typography variant="h6">Diagnosis</Typography>
                    {
                    diag.length ? diag.map((diag, key) => <Accordion key={
                            diag.diag_ID
                        }
                        expanded={
                            panel === key
                        }
                        onChange={
                            () => setPanel(key)
                    }>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography>{
                                diag.date
                            }</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="h6">
                                Name : {
                                `${
                                    diag.first_name
                                } ${
                                    diag.middle_name
                                } ${
                                    diag.last_name
                                }`
                            } </Typography>
                            <Typography variant="p">
                                Diagnosis : {
                                diag.diagnosis
                            } </Typography><br/>
                            <Typography variant="p">
                                Initial Remarks : {
                                diag.initial_remarks
                            } </Typography><br/>
                        </AccordionDetails>
                    </Accordion>) : <Grid item
                        xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    No Diagnosis found!
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    You can prescribe medicines once diagnosis is done completely
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                } </Grid>
            </Grid>

        </>
    );
};

export default Details;
