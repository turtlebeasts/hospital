import { Avatar, Grid, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
    return (
        <Grid container spacing={2} sx={{ backgroundColor: '#252525', color: 'white', pt: '5rem' }}>
            <Grid item xs={12}>
                <Grid container maxWidth={"md"} sx={{ margin: 'auto' }}>
                    <Grid item xs={12} sm={4} sx={{ textAlign: {xs: 'center',sm: 'end'} }}>
                        <Typography variant="h3">Natural</Typography>
                        <Grid sx={{ display: 'flex', alignItems: 'center', marginTop: '-1rem', justifyContent: {xs: 'center',sm: 'end'}, mb: {xs: '2rem', sm: 'none'} }}>
                            <Typography variant="h6">cancercarecenter</Typography>
                            <Typography variant="h6">•</Typography>
                            <Typography variant="h6">com</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="body1">GET PRESCRIBED</Typography><br />
                        <Typography variant="body1">OUR MEDICINES</Typography><br />
                        <Typography variant="body1">OUR MEDICINES</Typography><br />
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="body1">GET CONSULTED</Typography><br />
                        <Typography variant="body1">HERBAL BENIFITS</Typography><br />
                        <Typography variant="body1">OUR MEDICINES</Typography><br />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <hr style={{ color: 'white' }} />
            </Grid>
            <Grid item xs={12}>
                <Grid container maxWidth={"md"} sx={{ margin: 'auto', display: 'flex', justifyContent: 'space-around', mt: 5, mb: 5 }}>
                    <Avatar sx={{ backgroundColor: 'grey' }}>
                        <FacebookIcon />
                    </Avatar>
                    <Avatar sx={{ backgroundColor: 'grey' }}>
                        <InstagramIcon />
                    </Avatar>
                    <Avatar sx={{ backgroundColor: 'grey' }}>
                        <YouTubeIcon />
                    </Avatar>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center', backgroundColor: 'black' }}>
                <Typography variant="body1" sx={{ pt: 5 }}>COPYRIGHT © 2023 naturalcancercarecenter.com</Typography>
                <Typography variant="body1" sx={{ pb: 5 }}>Powered by <span style={{ color: 'lightblue', fontWeight: 900 }}>MekForUs</span> </Typography>
            </Grid>
        </Grid>
    )
}