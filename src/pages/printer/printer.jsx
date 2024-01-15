import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Printer() {

    const { userid, diagnosis } = useParams()
    const [detail, setDetail] = useState([])
    const [diag, setDiag] = useState([])

    useEffect(() => {
        async function diagnose(diagnosis) {
            const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/diag.php?diagid=${diagnosis}`)
            const result = await response.json()
            setDiag(result)
            console.log(result)
        }
        async function patient(userid) {
            const response = await fetch(`${import.meta.env.VITE_SITENAME}/hospital/index.php?getDetail=${userid}`)
            const result = await response.json()
            setDetail(result[0])
            // console.log(result)
            setTimeout(()=>window.print(),1000)
        }
        diagnose(diagnosis)
        patient(userid)
    }, [])
    return (
        <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid item xs={12} sx={{ border: '4px solid black', textAlign: 'center' }}>
                <Typography variant="h5">NATURAL CANCER CARE CENTER</Typography>
                <Typography variant="p">Vill - Nalani Kapahuwa, P.O- Dhaman (Tingkhong)</Typography><br/>
                <Typography variant="p">Dist.- Dibrugarh (Assam), Pin code- 786610</Typography><br/>
                <Typography variant="p"><b>Contact No.: 8011610990, 9678165454, 9395344890</b></Typography><br/>
                <Grid container sx={{ textAlign: 'left' }}>
                    <Grid item xs={4}>
                        <Typography variant="p"><b>Founder:</b></Typography><br/>
                        <Typography variant="p">Durlav Gogoi</Typography><br/>
                        <Typography variant="p">Aditya Borah</Typography><br/>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant="outlined" color="primary" sx={{ border: '2px solid #0058DD', color: '#0058DD', borderRadius: '15px' }}>Prescription</Button>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                <Grid container spacing={2} sx={{ textAlign: 'left', padding: '26px' }}>
                    <Grid item xs={12}>
                        <Grid container sx={{ border: '2px solid black', borderRadius: '15px', p: 2 }}>
                            <Grid item xs={6}>
                                <Typography variant="p">Regd No.:{detail.patient_ID}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="p">Date.:{detail.reg_date}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="p">Name.:{detail.first_name} {detail.middle_name} {detail.last_name}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="p">Age/Sex.:{detail.gender}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Grid container sx={{ border: '2px solid black', borderRadius: '15px' }}>
                            <Grid item xs={12} sx={{ textAlign: 'center', padding: 2 }}>
                                <Typography variant="p"><b><u>Diagnosis</u></b></Typography>
                                <div style={{ textAlign: 'left' }}>
                                    <Typography variant="p">{diag.length ? diag[0].diagnosis : ""}: {diag.length ? diag[0].remarks : ""}</Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} sx={{ mt: 2 }}>
                        <Grid container sx={{ border: '2px solid black', borderRadius: '15px', textAlign: 'center', paddingBottom: 67 }}>
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    Remarks
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={8} sx={{ mt: 2 }}>
                        <ol>
                            {
                                diag.map((item, key) =>
                                    <li key={key} style={{marginBottom: '10px'}}>
                                        <b>{item.generic_name}({item.name})</b>: {item.description}<br />
                                        <p>Additional medicines: {item.instruction}</p>
                                        * <span style={{ color: 'red' }}>take ({item.water_quantity}) with {item.mwith}, {item.times_perday} {item.times_perday == '1' ? "time" : "times"} per day</span>
                                        <p><b>Instruction:</b> {item.extras}</p>
                                    </li>
                                )
                            }
                        </ol>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    )
}