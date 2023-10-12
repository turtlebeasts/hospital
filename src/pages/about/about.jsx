import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

export default function Homepage(){
    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{bgcolor: 'primary.main', display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                    <Grid container spacing={2} sx={{p: 5}} maxWidth="md">
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h3"
                                sx={{color: 'white'}}
                            >
                                About us
                            </Typography>
                            <Typography
                                variant="p"
                                sx={{color: 'white'}}
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                    <Grid container spacing={2} sx={{p: 5}} maxWidth="md">
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h3"
                            >
                                Our<br/>
                                Successful<br/>
                                Ventures
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="p"
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
