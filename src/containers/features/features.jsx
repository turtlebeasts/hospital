import { Grid, Typography } from "@mui/material";
import "./features.css"
import one from "./one.png"
import multi from "./multi.png"
import clock from "./clock.png"

const style = {
    textAlign: 'center'
}

export default function Features() {
    return (
        <div className="image">
            <div className="features">
                <Grid container maxWidth={"md"} sx={{ margin: 'auto', marginTop: 5, marginBottom: 5 }}>
                    <Grid item style={style} xs={12} sm={4}>
                        <img src={one} alt="one" /><Typography variant="h6" sx={{ fontWeight: 900 }}>+2000<br />Patients</Typography>
                    </Grid>
                    <Grid item style={style} xs={12} sm={4}>
                        <img src={multi} alt="multi" /><Typography variant="h6" sx={{ fontWeight: 900 }}>Multiple<br />Specialists</Typography>
                    </Grid>
                    <Grid item style={style} xs={12} sm={4}>
                        <img src={clock} alt="clock" /><Typography variant="h6" sx={{ fontWeight: 900 }}>27x7<br />Available</Typography>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}