import { Card, CardContent, Grid, Typography } from "@mui/material";
import man from "./man.png"
import leaf from "./leaf.png"
import clock from "./clock.png"

export default function Intro() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container maxWidth={"md"} spacing={2} sx={{ marginTop: -10, zIndex: 1, padding: {xs:5, sm: 0} }}>
                <Grid item xs={6} md={4}>
                    <Card sx={{ backgroundColor: "#1A76D1", color: "white", }}>
                        <CardContent sx={{ paddingTop: '5vh', height: '20vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'space-between' }}>
                            <Typography variant="h6" sx={{ fontWeight: 900 }}>Natural Remedy</Typography>
                            <Typography variant="p">We provide natural remedies for all your health problems</Typography>
                            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
                                <img src={leaf} alt="leaf" />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Card sx={{ backgroundColor: "#1A76D1", color: "white" }}>
                        <CardContent sx={{ paddingTop: '5vh', height: '20vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'space-between' }}>
                            <Typography variant="h6" sx={{ fontWeight: 900 }}>Awareness on Cancer</Typography>
                            <Typography variant="p">We bring forth awareness in cancer and it’s precautions</Typography>
                            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
                                <img src={man} alt="man" />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ backgroundColor: "#1A76D1", color: "white" }} >
                        <CardContent sx={{ paddingTop: '5vh', height: '20vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'space-between' }}>
                            <Typography variant="h6" sx={{ fontWeight: 900 }}>Our clinic timing</Typography>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Thursday</td>
                                        <td>09:00 AM to 03:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>Saturday</td>
                                        <td>09:00 AM to 03:00 PM</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
                                <img src={clock} alt="clock" />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}