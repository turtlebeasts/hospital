import { Button, Grid, Typography } from "@mui/material";
import "./banner.css"
import { HashLink } from "react-router-hash-link";

export default function Banner(){
    return(
        <div id="Home" className="banner-image">
            <div className="banner-cover">
                <Grid container maxWidth={"md"}>
                    <Grid item xs={12} md={6} sx={{textAlign: {xs: 'center', sm: 'left'}, display: {xs: 'flex',sm: 'block'}, flexDirection: 'column', justifyContent: {xs:'center', sm: 'left'}, alignItems: 'center'}}>
                        <Typography variant="h3" sx={{fontWeight: 900, width: '96%'}}>We provide</Typography>
                        <Typography variant="h3" sx={{fontWeight: 900, width: '96%'}}><span>extensive</span> care</Typography>
                        <Typography variant="h3" sx={{fontWeight: 900, width: '96%'}}>for all your <span>ailments</span></Typography>
                        <Button variant="contained" color="primary" component={HashLink} smooth to="#contact">CONTACT US</Button>
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                </Grid>
            </div>
        </div>
    )
}