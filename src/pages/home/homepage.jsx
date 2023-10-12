import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

export default function Homepage(){
    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{bgcolor: 'primary.main'}}>
                    <Grid container spacing={2} sx={{p: 5}}>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h3"
                                sx={{color: 'white'}}
                            >
                                We provide<br/>
                                extensive care for<br/>
                                all your ailments
                            </Typography>
                            <Button
                                variant="contained"
                                color="info"
                                sx={{mt: 2}}
                            >
                                Contact Us
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <Grid container spacing={2} sx={{p: 5}}>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h1"
                            >
                                We
                            </Typography>
                            <Typography
                                variant="h3"
                            >
                                Specialise in
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
