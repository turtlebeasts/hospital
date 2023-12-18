import { Grid, Typography } from "@mui/material";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

export default function EverReady(){
    return(
        <Grid container spacing={2} sx={{textAlign: 'center', pt: '5rem', pb: '5rem'}}>
            <Grid item xs={12}>
                <Typography variant="h3">Ever ready to serve you</Typography>
                <Typography variant="h5">Feel free to contact us</Typography>
                <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CallIcon fontSize="large"/> 9678165464, 9395344890</Typography>
                <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18}}><EmailIcon fontSize="large"/> naturalcancercarecentre@gmail.com</Typography>
            </Grid>
        </Grid>
    )
}