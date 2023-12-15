import { Grid } from "@mui/material";

const colors = [
    'blue',
    'grey',
    'black',
    'lightblue'
]

export default function Medicine(){
    return(
        <Grid container id="Herbs">
            {
                colors.map(item=>
                    <Grid item xs={12} md={3} key={item} sx={{width: '40%', height: '20vh', backgroundColor: item}}></Grid>
                    )
            }
        </Grid>
    )
}