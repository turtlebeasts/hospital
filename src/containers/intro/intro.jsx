import { Card, CardContent, Grid, Typography } from "@mui/material";

export default function Intro() {
    return (
            <Grid container maxWidth={"md"} spacing={2} sx={{margin: 'auto', marginTop: -10, zIndex: 1}}>
                <Grid className="card-container" item xs={6} md={4}>
                    <Card sx={{padding: '5vh 0', backgroundColor: "#1A76D1", color: "white"}}>
                        <CardContent>
                            <Typography variant="h6" sx={{fontWeight: 900}}>Natural Remedy</Typography>
                            <Typography variant="p">We provide natural remedies for all your health problems</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid className="card-container" item xs={6} md={4}>
                    <Card sx={{padding: '5vh 0', backgroundColor: "#1A76D1", color: "white"}}>
                        <CardContent>
                            <Typography variant="h6" sx={{fontWeight: 900}}>Awareness on Cancer</Typography>
                            <Typography variant="p">We bring forth awareness in cancer and it’s precautions</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid className="card-container" item xs={12} md={4}>
                    <Card sx={{padding: '5vh 0', backgroundColor: "#1A76D1", color: "white"}} >
                        <CardContent>
                            <Typography variant="h6" sx={{fontWeight: 900}}>Our clinic timing</Typography>
                            <table>
                                <tr>
                                    <td>Thursday</td>
                                    <td>09:00 AM to 03:00 PM</td>
                                </tr>
                                <tr>
                                    <td>Saturday</td>
                                    <td>09:00 AM to 03:00 PM</td>
                                </tr>
                            </table>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
    )
}