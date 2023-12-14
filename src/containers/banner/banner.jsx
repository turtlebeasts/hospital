import { Button, Grid, Typography } from "@mui/material";
import "./banner.css"

export default function Banner(){
    return(
        <div className="banner-image">
            <div className="banner-cover">
                <Grid container maxWidth={"md"}>
                    <Grid item xs={12} md={6} sx={{textAlign: {xs: 'center', sm: 'left'}}}>
                        <Typography variant="h3" sx={{fontWeight: 900}}>We provide</Typography>
                        <Typography variant="h3" sx={{fontWeight: 900}}><span>extensive</span> care for</Typography>
                        <Typography variant="h3" sx={{fontWeight: 900}}>all your <span>ailments</span></Typography>
                        <Button variant="contained" color="primary">CONTACT US</Button>
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                </Grid>
            </div>
        </div>
    )
}