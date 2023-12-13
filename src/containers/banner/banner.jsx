import { Button, Grid, Typography } from "@mui/material";
import "./banner.css"

export default function Banner(){
    return(
        <div className="banner-image">
            <div className="banner-cover">
                <Grid container maxWidth={"md"}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3">We provide</Typography>
                        <Typography variant="h3"><span>extensive</span> care for</Typography>
                        <Typography variant="h3">all your <span>ailments</span></Typography>
                        <Button variant="contained" color="primary">CONTACT US</Button>
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                </Grid>
            </div>
        </div>
    )
}